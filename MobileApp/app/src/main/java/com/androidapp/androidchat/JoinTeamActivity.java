package com.androidapp.androidchat;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ProgressBar;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.Socket;


public class JoinTeamActivity extends Activity {

    private Socket mSocket;
    private ProgressBar spinner;
    private Button joinBlueButton1;
    private Button joinBlueButton2;
    private Button joinRedButton1;
    private Button joinRedButton2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_team);
        KayakRacerApp app = (KayakRacerApp) getApplication();
        mSocket = app.getSocket();
        joinBlueButton1 = (Button) findViewById(R.id.join_blue1);
        joinBlueButton1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("blue", 1);
            }
        });
        joinBlueButton2 = (Button) findViewById(R.id.join_blue2);
        joinBlueButton2.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("blue", 2);
            }
        });
        joinRedButton1 = (Button) findViewById(R.id.join_red3);
        joinRedButton1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("red", 3);
            }
        });
        joinRedButton2 = (Button) findViewById(R.id.join_red4);
        joinRedButton2.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("red", 4);
            }
        });
        spinner = (ProgressBar)findViewById(R.id.progressBar);
        spinner.setVisibility(View.INVISIBLE);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }


    private void attemptJoin(String colorpicker, int id) {

        JSONObject object = new JSONObject();
        try {
            object.put("device", "Mobile");
            object.put("color", colorpicker);
            Constants.color = colorpicker;
            Constants.id = id;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        spinner.setVisibility(View.VISIBLE);
        joinBlueButton1.setEnabled(false);
        joinBlueButton2.setEnabled(false);
        joinRedButton1.setEnabled(false);
        joinRedButton2.setEnabled(false);
        mSocket.emit("CONNECTION", object);
    }

}



