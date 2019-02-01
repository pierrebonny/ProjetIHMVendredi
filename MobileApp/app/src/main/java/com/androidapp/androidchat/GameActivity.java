package com.androidapp.androidchat;

import android.app.Activity;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.view.Display;
import android.view.Surface;
import android.view.WindowManager;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

import io.socket.client.Socket;

public class GameActivity extends Activity implements SensorEventListener {

    private Socket mSocket;
    long startTime;
    int leftOrRight = 0; //1 if left 2 if right
    boolean checkTime = true;
    private float startAzimuth=0f;

    // System sensor manager instance.
    private SensorManager mSensorManager;

    // Accelerometer and magnetometer sensors, as retrieved from the
    // sensor manager.
    private Sensor mSensorAccelerometer;
    private Sensor mSensorMagnetometer;

    // Current data from accelerometer & magnetometer.  The arrays hold values
    // for X, Y, and Z.
    private float[] mAccelerometerData = new float[3];
    private float[] mMagnetometerData = new float[3];

    // TextViews to display current sensor values.
    private TextView mTextSensorAzimuth;
    private TextView mTextSensorPitch;
    private TextView mTextSensorRoll;
    private TextView timer;

    // System display. Need this for determining rotation.
    private Display mDisplay;

    // Very small values for the accelerometer (on all three axes) should
    // be interpreted as 0. This value is the amount of acceptable
    // non-zero drift.
    private static final float VALUE_DRIFT = 0.05f;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        ChatApplication app = (ChatApplication) getApplication();

        timer = (TextView) findViewById(R.id.timer);
        mSocket = app.getSocket();
        timer.setText("waiting");

        mTextSensorAzimuth = (TextView) findViewById(R.id.value_azimuth);
        mTextSensorPitch = (TextView) findViewById(R.id.value_pitch);
        mTextSensorRoll = (TextView) findViewById(R.id.value_roll);
        // Get accelerometer and magnetometer sensors from the sensor manager.
        // The getDefaultSensor() method returns null if the sensor
        // is not available on the device.
        mSensorManager = (SensorManager) getSystemService(
                Context.SENSOR_SERVICE);
        mSensorAccelerometer = mSensorManager.getDefaultSensor(
                Sensor.TYPE_ACCELEROMETER);
        mSensorMagnetometer = mSensorManager.getDefaultSensor(
                Sensor.TYPE_MAGNETIC_FIELD);

        // Get the display from the window manager (for rotation).
        WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
        mDisplay = wm.getDefaultDisplay();
    }

    /**
     * Listeners for the sensors are registered in this callback so that
     * they can be unregistered in onStop().
     */
    @Override
    protected void onStart() {
        super.onStart();

        // Listeners for the sensors are registered in this callback and
        // can be unregistered in onStop().
        //
        // Check to ensure sensors are available before registering listeners.
        // Both listeners are registered with a "normal" amount of delay
        // (SENSOR_DELAY_NORMAL).
        if (mSensorAccelerometer != null) {
            mSensorManager.registerListener(this, mSensorAccelerometer,
                    SensorManager.SENSOR_DELAY_NORMAL);
        }
        if (mSensorMagnetometer != null) {
            mSensorManager.registerListener(this, mSensorMagnetometer,
                    SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    @Override
    protected void onStop() {
        super.onStop();

        // Unregister all sensor listeners in this callback so they don't
        // continue to use resources when the app is stopped.
        mSensorManager.unregisterListener(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void sendMove(float speed, float roll) {
        JSONObject object = new JSONObject();
        try {
            object.put("rotation", (leftOrRight == 1) ? 0.0001 : -0.0001);
            object.put("speed", speed);
            object.put("color", Constants.color);
            object.put("id", Constants.id);
            object.put("pitch", (leftOrRight == 1) ?  roll*57.2958f + 90 :  roll*57.2958f);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSocket.emit("MOVE", object);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        // The sensor type (as defined in the Sensor class).
        int sensorType = sensorEvent.sensor.getType();

        // The sensorEvent object is reused across calls to onSensorChanged().
        // clone() gets a copy so the data doesn't change out from under us
        switch (sensorType) {
            case Sensor.TYPE_ACCELEROMETER:
                mAccelerometerData = sensorEvent.values.clone();
                break;
            case Sensor.TYPE_MAGNETIC_FIELD:
                mMagnetometerData = sensorEvent.values.clone();
                break;
            default:
                return;
        }
        // Compute the rotation matrix: merges and translates the data
        // from the accelerometer and magnetometer, in the device coordinate
        // system, into a matrix in the world's coordinate system.
        //
        // The second argument is an inclination matrix, which isn't
        // used in this example.
        float[] rotationMatrix = new float[9];
        boolean rotationOK = SensorManager.getRotationMatrix(rotationMatrix,
                null, mAccelerometerData, mMagnetometerData);

        // Remap the matrix based on current device/activity rotation.
        float[] rotationMatrixAdjusted = new float[9];
        switch (mDisplay.getRotation()) {
            case Surface.ROTATION_0:
                rotationMatrixAdjusted = rotationMatrix.clone();
                break;
            case Surface.ROTATION_90:
                SensorManager.remapCoordinateSystem(rotationMatrix,
                        SensorManager.AXIS_Y, SensorManager.AXIS_MINUS_X,
                        rotationMatrixAdjusted);
                break;
            case Surface.ROTATION_180:
                SensorManager.remapCoordinateSystem(rotationMatrix,
                        SensorManager.AXIS_MINUS_X, SensorManager.AXIS_MINUS_Y,
                        rotationMatrixAdjusted);
                break;
            case Surface.ROTATION_270:
                SensorManager.remapCoordinateSystem(rotationMatrix,
                        SensorManager.AXIS_MINUS_Y, SensorManager.AXIS_X,
                        rotationMatrixAdjusted);
                break;
        }

        // Get the orientation of the device (azimuth, pitch, roll) based
        // on the rotation matrix. Output units are radians.
        float orientationValues[] = new float[3];
        if (rotationOK) {
            SensorManager.getOrientation(rotationMatrixAdjusted,
                    orientationValues);
        }

        // Pull out the individual values from the array.
        float azimuth = orientationValues[0];
        float pitch = orientationValues[1];
        float roll = orientationValues[2];

        // Pitch and roll values that are close to but not 0 cause the
        // animation to flash a lot. Adjust pitch and roll to 0 for very
        // small values (as defined by VALUE_DRIFT).
        if (Math.abs(pitch) < VALUE_DRIFT) {
            pitch = 0;
        }
        if (Math.abs(roll) < VALUE_DRIFT) {
            roll = 0;
        }

        // Fill in the string placeholders and set the textview text.
        mTextSensorAzimuth.setText(getResources().getString(
                R.string.value_format, azimuth));
        mTextSensorPitch.setText(getResources().getString(
                R.string.value_format, pitch));
        mTextSensorRoll.setText(getResources().getString(
                R.string.value_format, roll));

        if (Constants.start) {
            timer.setText("START");
            int isLeftOrRightValue = isLeftOrRight(pitch);
            if (checkTime && isLeftOrRightValue != 0) {
                startAzimuth = azimuth;
                startTime = System.currentTimeMillis();
                checkTime = false;
                leftOrRight = isLeftOrRightValue;
            } else if (!checkTime && isLeftOrRightValue == 0) {
                checkTime = true;
                timer.setText("waiting!");
                leftOrRight = 0;
            } else if (!checkTime) {
                timer.setText("" + (500 - ((new Date()).getTime() - startTime)));
                if (((new Date()).getTime() - startTime) > 500) {
                    sendMove(10 * azimuthCoefficient(isLeftOrRightValue, startAzimuth, azimuth) * rollCoefficient(isLeftOrRightValue, roll), roll);
                    timer.setText("waiting!");
                    checkTime = true;
                    leftOrRight = 0;
                }
            }
        }
    }


    /**
     * @param pitch
     * @return 1 when the paddle is in contact with water at the left
     * 2 when the paddle is in contact with water at the right
     * 0 otherwise
     */
    public int isLeftOrRight(float pitch) {
        if (pitch < -0.5 && pitch > -1.4)
            return 2;
        else if (pitch < 1.4 && pitch > 0.5) {
            return 1;
        } else {
            return 0;
        }
    }


    public float rollCoefficient(int leftOrRight, float roll) {
        float coeff = 0;
        if (leftOrRight == 1) {
            coeff = (Math.abs(roll) / -1.5f) + 1;
        }
        if (leftOrRight == 2) {
            coeff = (Math.abs(roll) / 1.5f);
        }
        return coeff;
    }

    public float azimuthCoefficient(int leftOrRight, float startAzimuth, float azimuth) {
        float coeff = 0;
        if (leftOrRight == 1) {
            coeff = -(azimuth - startAzimuth)*10;
        }
        if (leftOrRight == 2) {
            coeff = (azimuth - startAzimuth)*10;
        }
        return coeff;
    }




    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}