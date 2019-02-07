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
    private float startAzimuth = 0f;

    private SensorManager mSensorManager;
    private Sensor mSensorAccelerometer;
    private Sensor mSensorMagnetometer;
    private float[] mAccelerometerData = new float[3];
    private float[] mMagnetometerData = new float[3];

    private TextView mTextSensorAzimuth;
    private TextView mTextSensorPitch;
    private TextView mTextSensorRoll;
    private TextView timer;
    private Display mDisplay;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        KayakRacerApp app = (KayakRacerApp) getApplication();

        timer = (TextView) findViewById(R.id.timer);
        mSocket = app.getSocket();
        timer.setText("waiting");

        mTextSensorAzimuth = (TextView) findViewById(R.id.value_azimuth);
        mTextSensorPitch = (TextView) findViewById(R.id.value_pitch);
        mTextSensorRoll = (TextView) findViewById(R.id.value_roll);
        mSensorManager = (SensorManager) getSystemService(
                Context.SENSOR_SERVICE);
        mSensorAccelerometer = mSensorManager.getDefaultSensor(
                Sensor.TYPE_ACCELEROMETER);
        mSensorMagnetometer = mSensorManager.getDefaultSensor(
                Sensor.TYPE_MAGNETIC_FIELD);
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
        mSensorManager.unregisterListener(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void sendMove(float speed, float roll) {
        JSONObject object = new JSONObject();
        try {
            object.put("rotation", (leftOrRight == 1) ? 1 : -1);
            object.put("speed", speed);
            object.put("color", Constants.color);
            object.put("id", Constants.id);
            object.put("pitch", (leftOrRight == 1) ? -roll : roll+90);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSocket.emit("MOVE", object);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        int sensorType = sensorEvent.sensor.getType();
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
        float[] rotationMatrix = new float[9];
        boolean rotationOK = SensorManager.getRotationMatrix(rotationMatrix,
                null, mAccelerometerData, mMagnetometerData);
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

        float orientationValues[] = new float[3];
        if (rotationOK) {
            SensorManager.getOrientation(rotationMatrixAdjusted,
                    orientationValues);
        }

        float azimuth = orientationValues[0] * 57.2958f;
        float pitch = orientationValues[1] * 57.2958f;
        float roll = orientationValues[2] * 57.2958f;

        mTextSensorAzimuth.setText(getResources().getString(
                R.string.value_format, azimuth));
        mTextSensorPitch.setText(getResources().getString(
                R.string.value_format, pitch));
        mTextSensorRoll.setText(getResources().getString(
                R.string.value_format, roll));

        if (Constants.finish) {
            timer.setText("FINISH");
        }
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
                timer.setText("" + (300 - ((new Date()).getTime() - startTime)));
                if (((new Date()).getTime() - startTime) > 300) {
                    sendMove(150 * azimuthCoefficient(isLeftOrRightValue, startAzimuth, azimuth) * rollCoefficient(isLeftOrRightValue, roll), roll);
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
        if (pitch < - 50)
            return 2;
        else if (pitch > 50) {
            return 1;
        } else {
            return 0;
        }
    }


    public float rollCoefficient(int leftOrRight, float roll) {
        float coeff = 0;
        float rollAbs = Math.abs(roll);
        if (leftOrRight == 2) {
            rollAbs += 90;
        }
        if (rollAbs<=90)
            coeff=rollAbs/90;
        else
            coeff=90-(rollAbs%90);
        return coeff;
    }

    public float azimuthCoefficient(int leftOrRight, float startAzimuth, float azimuth) {
        float coeff = 0;
        if (leftOrRight == 1) {
            coeff = -(azimuth - startAzimuth) / 1.2f;
        }
        if (leftOrRight == 2) {
            coeff = (azimuth - startAzimuth) / 1.2f;
        }
        return coeff;
    }


    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}