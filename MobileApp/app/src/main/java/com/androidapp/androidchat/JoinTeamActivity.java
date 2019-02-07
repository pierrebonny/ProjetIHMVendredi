package com.androidapp.androidchat;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.Socket;


public class JoinTeamActivity extends Activity {

    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_team);
        KayakRacerApp app = (KayakRacerApp) getApplication();
        mSocket = app.getSocket();
        Button joinBlueButton1 = (Button) findViewById(R.id.join_blue1);
        joinBlueButton1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("blue", 1);
            }
        });
        Button joinBlueButton2 = (Button) findViewById(R.id.join_blue2);
        joinBlueButton2.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("blue", 2);
            }
        });
        Button joinRedButton1 = (Button) findViewById(R.id.join_red3);
        joinRedButton1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("red", 3);
            }
        });
        Button joinRedButton2 = (Button) findViewById(R.id.join_red4);
        joinRedButton2.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin("red", 4);
            }
        });
//        Button joinGreenButton1 = (Button) findViewById(R.id.join_green5);
//        joinGreenButton1.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                attemptJoin("green", 5);
//            }
//        });
//        Button joinGreenButton2 = (Button) findViewById(R.id.join_green6);
//        joinGreenButton2.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                attemptJoin("green", 6);
//            }
//        });
//        Button joinOrangeButton1 = (Button) findViewById(R.id.join_orange7);
//        joinOrangeButton1.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                attemptJoin("yellow", 7);
//            }
//        });
//        Button joinOrangeButton2 = (Button) findViewById(R.id.join_orange8);
//        joinOrangeButton2.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                attemptJoin("yellow", 8);
//            }
//        });

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
            //object.put("current", new Double(152.32));
            Constants.color = colorpicker;
            Constants.id = id;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSocket.emit("CONNECTION", object);
    }

}



