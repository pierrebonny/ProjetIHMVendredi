package com.androidapp.androidchat;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.Socket;

public class GameActivity extends Activity {

    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        ChatApplication app = (ChatApplication) getApplication();
        mSocket = app.getSocket();
        Button signInButton = (Button) findViewById(R.id.start_button);
        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptStart();
            }
        });

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    private void attemptStart() {
        JSONObject object = new JSONObject();
        try {
            object.put("direction", "42");
            object.put("speed", "42");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSocket.emit("MOVE", object);
    }

}