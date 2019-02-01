package com.androidapp.androidchat;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.Socket;


public class LoginActivity extends Activity {

    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ChatApplication app = (ChatApplication) getApplication();
        mSocket = app.getSocket();
        Button joinBlueButton = (Button) findViewById(R.id.join_blue1);
        joinBlueButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin("blue", 1);
            }
        });
        Button joinRedButton = (Button) findViewById(R.id.join_blue2);
        joinRedButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin("blue", 2);
            }
        });
        Button joinYellowButton = (Button) findViewById(R.id.join_red3);
        joinYellowButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin("red", 3);
            }
        });
        Button joinGreenButton = (Button) findViewById(R.id.join_red4);
        joinGreenButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin("red", 4);
            }
        });

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    /**
     * Attempts to sign in the account specified by the login form.
     * If there are form errors (invalid username, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    private void attemptLogin(String colorpicker, int id) {

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



