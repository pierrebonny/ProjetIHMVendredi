package com.androidapp.androidchat;


import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import io.socket.client.Socket;

public class StartActivity extends Activity {

    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        KayakRacerApp app = (KayakRacerApp) getApplication();
        mSocket = app.getSocket();
        final TextView waitingText = (TextView)findViewById(R.id.waiting);
        waitingText.setVisibility(View.INVISIBLE);
        final Button startButton = (Button) findViewById(R.id.start_button);
        startButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                    waitingText.setVisibility(View.VISIBLE);
                    startButton.setVisibility(View.VISIBLE);
                attemptStart();
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    private void attemptStart() {
        mSocket.emit("ADD_PLAYER");
    }

}




