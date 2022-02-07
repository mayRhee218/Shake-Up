package com.example.myapplication;

import android.Manifest;
import android.content.Intent;
import android.hardware.Camera;
import android.media.CamcorderProfile;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.widget.Button;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.gun0912.tedpermission.PermissionListener;
import com.gun0912.tedpermission.TedPermission;

public class CameraActivity extends AppCompatActivity implements SurfaceHolder.Callback {

    private Button btn_record;
    private SurfaceView surfaceView;
    private Camera camera;
    private MediaRecorder mediaRecorder;
    private SurfaceHolder surfaceHolder;
    private boolean recording = false;
    private String videoFileName; // 녹화 생성 파일 이름
    private String TAG = "MainActivity.java";



//    // Create a reference to "mountains.jpg"
//    StorageReference mountainsRef = storageRef.child("test.mp4");
//
//    // Create a reference to 'images/mountains.jpg'
//    StorageReference mountainImagesRef = storageRef.child("videos/1643780397971.mp4");

//    // While the file names are the same, the references point to different files
//    mountainsRef.getName().equals(mountainImagesRef.getName());    // true
//    mountainsRef.getPath().equals(mountainImagesRef.getPath());    // false


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.camera_test);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();   //타이틀바 숨기기

        FirebaseStorage storage = FirebaseStorage.getInstance();

        // Create a storage reference from our app
        StorageReference storageRef = storage.getReference();

        // Create a reference with an initial file path and name
        StorageReference pathReference = storageRef.child("videos/1643780397971");

        //artivitiy_video.xml에 있는 VidioView
        final VideoView videoview=(VideoView)findViewById(R.id.videoView);

        //MainActivity 에서 비디오URL 값 가져오기
        String videoUrl;
        Intent intent = getIntent();
        videoUrl = intent.getStringExtra("동영상링크");

        System.out.println("주소값 : " + videoUrl);

        //Video View에서 보여줄 동영상주소.
        Uri url= Uri.parse(videoUrl);
        videoview.setVideoURI(url);

        //비디오 컨트롤바.
//        videoview.setMediaController(new MediaController(this));
        //비디오 재생
//        videoview.start();

        TedPermission.with(this) //권한을 얻기 위한 코드이다.
                .setPermissionListener(permission)
                .setRationaleMessage("녹화를 위하여 권한을 허용해주세요.")
                .setDeniedMessage("권한이 거부되었습니다. 설정 > 권한에서 허용할 수 있습니다.")
                .setPermissions(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.RECORD_AUDIO, Manifest.permission.READ_EXTERNAL_STORAGE)
                .check();

        btn_record = (Button)findViewById(R.id.btn_record);
        btn_record.setOnClickListener(v -> {
            if (recording) { //녹화 중일 때 버튼을 누르면 녹화가 종료하도록 한다.
                videoview.stopPlayback();
                //종료 시(stop) 자동으로 저장도 완료가 된다.
                mediaRecorder.stop();
                mediaRecorder.release();
                camera.lock();

                Toast.makeText(CameraActivity.this, videoFileName + "에 저장", Toast.LENGTH_SHORT).show();

                //Firebase Upload
                Uri file = Uri.fromFile(new File(videoFileName));
                System.out.println("file : " + file);
                //저장할 때 파일명 설정
                StorageReference riversRef = storageRef.child("videos/test.mp4");
                System.out.println("file : " + riversRef);
                // Register observers to listen for when the download is done or if it fails`
                riversRef.putFile(file).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        // Handle unsuccessful uploads
                        System.out.println("실패 : " + exception.toString());
                    }
                }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        // taskSnapshot.getMetadata() contains file metadata such as size, content-type, etc.
                        // ...
                        System.out.println("성공 : " + taskSnapshot.toString());
                    }
                });
//                deleteFile(videoFileName);

                setResult(RESULT_OK);
                finish();

            } else { //녹화 중이 아닐 때 버튼을 누르면 녹화가 시작하게 한다.
                videoview.start();
                runOnUiThread(new Runnable() { //녹화를 하는 것은 백그라운드로 하는 것이 좋다.
                    @Override
                    public void run() {
                        Toast.makeText(CameraActivity.this, "녹화가 시작되었습니다.", Toast.LENGTH_SHORT).show();
                        try {
                            mediaRecorder = new MediaRecorder();
                            camera.unlock();
                            mediaRecorder.setCamera(camera);
                            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.CAMCORDER);
                            mediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);
                            mediaRecorder.setProfile(CamcorderProfile.get(CamcorderProfile.QUALITY_720P));
                            mediaRecorder.setOrientationHint(90);
                            //파일의 외부 경로 확인
                            //저장경로 : /storage/emulated/0/Android/data/com.example.myapplication/files
                            String recordPath = getExternalFilesDir("/").getAbsolutePath();
                            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
                            videoFileName = recordPath + "/" +"Record_" + timeStamp + "_"+"video.mp4";
//                            System.out.println("저장경로 : " + videoFileName);
                            mediaRecorder.setOutputFile(videoFileName);
                            mediaRecorder.setPreviewDisplay(surfaceHolder.getSurface());
                            mediaRecorder.prepare();
                            mediaRecorder.start();
                            recording = true;
                            btn_record.setText("녹화 종료");
                        } catch (IOException e) {
                            Log.e(TAG, "Error in 79" + e.getMessage());
                            e.printStackTrace();
                            mediaRecorder.release();
                        }
                    }

                });
            }
        });
    }




    PermissionListener permission = new PermissionListener() {
        @Override
        public void onPermissionGranted() { //권한을 허용받았을 때 camera와 surfaceView에 대한 설정을 해준다.
            camera = Camera.open();
            camera.setDisplayOrientation(90);
            surfaceView = (SurfaceView)findViewById(R.id.surfaceView);
            surfaceHolder = surfaceView.getHolder();
            surfaceHolder.addCallback(CameraActivity.this);
            surfaceHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
            Toast.makeText(CameraActivity.this, "권한 허가", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onPermissionDenied(List<String> deniedPermissions) {

        }

        public void onPermissionDenied(ArrayList<String> deniedPermissions) { //권한이 거부됐을 때 이벤트를 설정할 수 있다.
            Toast.makeText(CameraActivity.this, "권한 거부", Toast.LENGTH_SHORT).show();
        }
    };

    @Override
    public void surfaceCreated(@NonNull SurfaceHolder holder) {
    }

    private void refreshCamera(Camera camera) {
        if (surfaceHolder.getSurface() == null) {
            return;
        }
        try {
            camera.stopPreview();
        } catch (Exception e) {
            e.printStackTrace();
        }
        setCamera(camera);
    }

    private void setCamera(Camera cam) {
        camera = cam;
    }

    @Override
    public void surfaceChanged(@NonNull SurfaceHolder holder, int format, int width, int height) {
        refreshCamera(camera);
    }

    @Override
    public void surfaceDestroyed(@NonNull SurfaceHolder holder) {

    }
}
