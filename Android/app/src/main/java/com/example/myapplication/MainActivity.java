package com.example.myapplication;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;

public class MainActivity extends AppCompatActivity {

    private  WebView mwv;//Mobile Web View
    public static Context mContext;
    public String videoUrl ="";
    private static final int RC_FILE_CHOOSE = 2833;
    private ValueCallback<Uri> mUploadMsg = null;


    static final int REQUEST_VIDEO_CAPTURE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        setContentView(R.layout.camera_test);
        mContext = this.getApplicationContext();

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();   //타이틀바 숨기기

        mwv=(WebView)findViewById(R.id.activity_main_webview);
        mwv.addJavascriptInterface(new WebAppInterface(this), "Android");
        WebSettings mws=mwv.getSettings();//Mobile Web Setting
        mws.setDomStorageEnabled(true);
        mws.setJavaScriptEnabled(true);//자바스크립트 허용
        mws.setLoadWithOverviewMode(true);//컨텐츠가 웹뷰보다 클 경우 스크린 크기에 맞게 조정
        mwv.loadUrl("http://121.159.4.37:3000/");
        mwv.setWebViewClient(new WebViewClientClass());
    }
    private class WebViewClientClass extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (url.startsWith("app://")) {
                Intent intent = new Intent(mContext.getApplicationContext(), CameraActivity.class);
//                startActivity(intent);
                startActivityForResult(intent,0);
                return true;
            }
            else {
                view.loadUrl(url);
                return true;
            }
        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode==0){
            if (resultCode==RESULT_OK) {
                Toast.makeText(mContext, "로딩 페이지 작동 성공" , Toast.LENGTH_LONG).show();
                mwv.loadUrl("javascript.loadingPage()");
            }else{
                Toast.makeText(mContext, "로딩 페이지 작동 실패" , Toast.LENGTH_LONG).show();
            }
        }else if(requestCode==1){
        }
    }

    public class WebAppInterface {
        Context mContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }



        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast, String url) {
            //토스트 메시지 보여주기
            Toast.makeText(mContext, toast , Toast.LENGTH_LONG).show();
            //카메라 실행
            Intent intent = new Intent(MainActivity.this, CameraActivity.class);
            intent.putExtra("동영상링크",url);
            startActivity(intent);
        }
    }




    //추가전에 뒤로가기 이벤트 호출시 홈으로 돌아갔으나, 이젠 일반적인 뒤로가기 기능 활성화
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (mwv.canGoBack()) {
                mwv.goBack();
                return false;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

}