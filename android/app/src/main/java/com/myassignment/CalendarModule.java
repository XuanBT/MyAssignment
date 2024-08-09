package com.myassignment;
import androidx.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class CalendarModule  extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public String createCalendarEvent(String name, String location) {
        Log.d("createCalendarEvent","Create event called with name: " + name
                + " and location: " + location);
        System.out.println("createCalendarEvent");
        return "createCalendarEvent";
    }
}
