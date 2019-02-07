package com.androidapp.androidchat;


import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import io.socket.client.Socket;

public class StartActivity extends Activity {

    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        KayakRacerApp app = (KayakRacerApp) getApplication();
        mSocket = app.getSocket();
        final Button startButtonBlue = (Button) findViewById(R.id.start_button_blue);
        startButtonBlue.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startButtonBlue.setText(R.string.waiting_players);
                startButtonBlue.setEnabled(false);
                attemptStart();
            }
        });
        final Button startButtonRed = (Button) findViewById(R.id.start_button_red);
        startButtonRed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startButtonRed.setText(R.string.waiting_players);
                startButtonRed.setEnabled(false);
                attemptStart();
            }
        });
        if (Constants.color.equals("red"))
            startButtonBlue.setVisibility(View.INVISIBLE);
        else startButtonRed.setVisibility(View.INVISIBLE);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    private void attemptStart() {
        mSocket.emit("ADD_PLAYER");
    }

}




