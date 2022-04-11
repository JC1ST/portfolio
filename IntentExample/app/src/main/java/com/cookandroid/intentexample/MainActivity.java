package com.cookandroid.intentexample;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private EditText et_test;
    private Button btn_move;
    private String str;
    private ImageView img_test;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        et_test = findViewById(R.id.et_test);
        btn_move = findViewById(R.id.btn_move);
        img_test = findViewById(R.id.img_test);

        btn_move.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                str = et_test.getText().toString(); // 버튼 클릭 시 str에 텍스트가 들어가게끔

                Intent intent = new Intent(MainActivity.this, SubActivity.class);
                intent.putExtra("str", str); // 텍스트 str을 타 액티비티로 넘기기(putExtra 사용)
                startActivity(intent); // 액티비티 이동(메인에서 서브로)
            }
        });

        img_test.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(), "토스트 메시지입니다", Toast.LENGTH_SHORT).show(); // 토스트 메시지 띄우기
            }
        });
    }
}
