package com.androidapp.androidchat;

import android.app.Application;
import android.content.Context;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;

public class KayakRacerApp extends Application {

    private static Context context;
    private Socket mSocket;
    {
        try {
            mSocket = IO.socket(Constants.SERVER_URL);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Lancement de l'application
     */
    public void onCreate() {
        super.onCreate();
        KayakRacerApp.context = getApplicationContext();
    }

    /**
     * Retourne le context de l'application
     * @return Context de l'application
     */
    public static Context getContext()
    {
        return KayakRacerApp.context;
    }


    public Socket getSocket() {
        return mSocket;
    }
}
