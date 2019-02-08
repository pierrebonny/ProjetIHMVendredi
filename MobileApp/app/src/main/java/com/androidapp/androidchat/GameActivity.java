package com.androidapp.androidchat;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.Display;
import android.view.Surface;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.Socket;

public class GameActivity extends Activity implements SensorEventListener {

    private Socket mSocket;
    boolean isPaddling = false;
    boolean firstHint = true;
    private float startAzimuth = 0f;
    private float startRoll = 0f;
    private int startLeftOrRight = 0; //1 if left 2 if right
    private View gameView;
    final MediaPlayer mp = MediaPlayer.create(KayakRacerApp.getContext(), R.raw.rame);

    private SensorManager mSensorManager;
    private Sensor mSensorAccelerometer;
    private Sensor mSensorMagnetometer;
    private float[] mAccelerometerData = new float[3];
    private float[] mMagnetometerData = new float[3];

    private TextView hint;
    private Display mDisplay;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        KayakRacerApp app = (KayakRacerApp) getApplication();
        gameView = findViewById(R.id.gameView);
        hint = (TextView) findViewById(R.id.hint);
        hint.setRotation(90);
        hint.setTextColor(Color.parseColor("#FFFFFF"));
        mSocket = app.getSocket();
        hint.setText("PREPAREZ VOUS...");

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
            object.put("rotation", (startLeftOrRight == 1) ? 1 : -1);
            object.put("speed", speed);
            object.put("color", Constants.color);
            object.put("id", Constants.id);
            object.put("pitch", (startLeftOrRight == 1) ? -roll : roll + 90);
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

        float azimuth = orientationValues[0] * 57.2958f + 180;
        float pitch = orientationValues[1] * 57.2958f;
        float roll = orientationValues[2] * 57.2958f;

        if (Constants.start && firstHint) {
            hint.setText("PAGAYEZ!");
            firstHint = false;
        }
        if (Constants.finish) {
            hint.setText("PARTIE TERMINEE !");
        } else if (Constants.start) {
            int isLeftOrRightValue = isLeftOrRight(pitch);
            if (!isPaddling && isLeftOrRightValue != 0) {
                mp.start();
                startAzimuth = azimuth;
                startRoll = roll;
                startLeftOrRight = isLeftOrRightValue;
                isPaddling = true;
            } else if (isPaddling && isLeftOrRightValue == 0) {
                isPaddling = false;
                float rollCoeff = rollCoefficient(startLeftOrRight, startRoll);
                float azCoeff = azimuthCoefficient(startLeftOrRight, startAzimuth, azimuth);
                sendMove(150 * rollCoeff * azCoeff, startRoll);
                if (rollCoeff < 0.7) {
                    gameView.setBackgroundColor(Color.parseColor("#FFA500"));
                    hint.setText("Astuce : La pale doit être perpendiculaire au sens de mouvement!");
                } else if (azCoeff < 0.4) {
                    gameView.setBackgroundColor(Color.parseColor("#FFA500"));
                    hint.setText("Astuce : Un mouvement plus ample vous fera gagner en vitesse!");
                } else {
                    gameView.setBackgroundColor(Color.parseColor("#1aa318"));
                    hint.setText("JOLI COUP!!!");
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
        if (pitch < -40 && pitch > -85)
            return 2;
        else if (pitch > 40 && pitch < 85) {
            return 1;
        } else {
            return 0;
        }
    }


    public float rollCoefficient(int leftOrRight, float roll) {
        float coeff;
        if (leftOrRight == 2) {
            roll += 90;
        }
        float rollAbs = Math.abs(roll);
        if (rollAbs <= 90)
            coeff = rollAbs / 90;
        else
            coeff = (90 - (rollAbs % 90)) / 90;
        return coeff;
    }

    public float azimuthCoefficient(int leftOrRight, float startAzimuth, float azimuth) {
        float coeff = 0;
        boolean isAnnoying = Math.abs(azimuth-startAzimuth)>180;
        if (leftOrRight == 1) {
            if (isAnnoying)
                coeff = (startAzimuth + (azimuth-360))/120;
            else
                coeff = (startAzimuth-azimuth)/120;
        }
        if (leftOrRight == 2) {
            if (isAnnoying)
                coeff = (azimuth + (startAzimuth-360))/120;
            else
                coeff = (azimuth - startAzimuth)/120;
        }
        return coeff;
    }


    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}