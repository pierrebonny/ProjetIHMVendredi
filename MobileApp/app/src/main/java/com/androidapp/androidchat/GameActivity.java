package com.androidapp.androidchat;

import android.app.Activity;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

import io.socket.client.Socket;

public class GameActivity extends Activity implements SensorEventListener {

    TextView timer;

    private Socket mSocket;
    long startTime;
    int leftOrRight = 0; //1 if left 2 if right
    boolean checkTime = true;
    SensorManager sManager;
    SensorEventListener sListener;
    float Rot[] = null; //for gravity rotational data
    //don't use R because android uses that for other stuff
    float I[] = null; //for magnetic rotational data
    float accels[] = new float[3];
    float mags[] = new float[3];
    float[] values = new float[3];
    float pitch;
    float roll;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        sManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        ChatApplication app = (ChatApplication) getApplication();
        timer = (TextView) findViewById(R.id.timer);
        //timer.setRotation(-90);
        mSocket = app.getSocket();
        timer.setText("waiting");
    }

    //when this Activity starts
    @Override
    protected void onResume() {
        super.onResume();
    /*register the sensor listener to listen to the gyroscope sensor, use the
    callbacks defined in this class, and gather the sensor information as quick
    as possible*/
        sManager.registerListener(this, sManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER), SensorManager.SENSOR_DELAY_NORMAL);
        sManager.registerListener(this, sManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD), SensorManager.SENSOR_DELAY_NORMAL);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void sendMove(boolean isTouched) {
        JSONObject object = new JSONObject();
        try {
            object.put("rotation", (leftOrRight==1) ? 0.0001 : -0.0001);
            object.put("speed", 420);
            object.put("color", Constants.color);
            object.put("touch", isTouched);
            object.put("pitch", pitch+90);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSocket.emit("MOVE", object);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {//below commented code - junk - unreliable is never populated
        //if sensor is unreliable, return void
        //if (event.accuracy == SensorManager.SENSOR_STATUS_UNRELIABLE)
        //{
        //    return;
        //}

        switch (sensorEvent.sensor.getType()) {
            case Sensor.TYPE_MAGNETIC_FIELD:
                mags = sensorEvent.values.clone();
                break;
            case Sensor.TYPE_ACCELEROMETER:
                accels = sensorEvent.values.clone();
                break;
        }

        if (mags != null && accels != null) {
            Rot = new float[9];
            I = new float[9];
            SensorManager.getRotationMatrix(Rot, I, accels, mags);
            // Correct if screen is in Landscape

            float[] outR = new float[9];
            SensorManager.remapCoordinateSystem(Rot, SensorManager.AXIS_X, SensorManager.AXIS_Z, outR);
            SensorManager.getOrientation(outR, values);

            pitch = values[1] * 57.2957795f;
            roll = values[2] * 57.2957795f;
            mags = null; //retrigger the loop when things are repopulated
            accels = null; ////retrigger the loop when things are repopulated

            if(Constants.start) {
                timer.setText("START");
                int isLeftOrRightValue = isLeftOrRight(roll);
                if (checkTime && isLeftOrRightValue != 0) {
                    startTime = System.currentTimeMillis();
                    checkTime = false;
                    leftOrRight = isLeftOrRightValue;
                } else if (!checkTime && isLeftOrRightValue == 0) {
                    checkTime = true;
                    timer.setText("waiting!");
                    leftOrRight = 0;
                } else if (!checkTime) {
                    timer.setText("" + (1500 - ((new Date()).getTime() - startTime)));
                    if (((new Date()).getTime() - startTime) > 1500) {
                        sendMove(isTouched(isLeftOrRightValue));
                        timer.setText("waiting!");
                        checkTime = true;
                        leftOrRight = 0;
                    }
                }
            }
        }
    }

    /**
     * @param roll
     * @return
     * 1 when the paddle is in contact with water at the left
     * 2 when the paddle is not in contact with water but it is a left tentative
     * 3 when the paddle is in contact with water at the right
     * 4 when the paddle is not in contact with water but it is a right tentative
     * 0 otherwise
     */
    public int isLeftOrRight(float roll) {
        if ((roll < 80 && roll > 0) || (roll < -100 && roll > -180)) {
            if (roll < 60 || roll < -120) {
                return 1;
            }else{
                return 2;
            }
        } else if ((roll < 0 && roll > -80) || (roll < 180 && roll > 100)) {
            if (roll > -60 || roll > 120) {
                return 3;
            }else{
                return 4;
            }
        } else {
            return 0;
        }
    }

    public boolean isTouched(int isLeftOrRightValue) {
        if (isLeftOrRightValue==1||isLeftOrRightValue==3){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}