package com.cookandroid.streetpiano;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = (ListView)findViewById(R.id.list);

        List<String> data = new ArrayList<>();

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, data);
        listView.setAdapter(adapter);

        data.add("석촌호수");
        data.add("신촌");
        data.add("뚝섬유원지");
        data.add("선유도공원");
        data.add("DDP");
        data.add("강동구 천호지하도로");
        data.add("상무역");
        data.add("남광주역");
        data.add("수서역");
        data.add("서울로 7017");

        adapter.notifyDataSetChanged(); // 저장

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Intent intent = null;
                int pos = position;

                switch (pos) {
                    case 0:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.50983292455056, 127.10257757619424 ? z=16")); // 석촌호수
                        startActivity(intent);
                        break;
                    case 1:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.55572871662407, 126.93690699400207 ? z=16")); // 신촌
                        startActivity(intent);
                        break;
                    case 2:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.53036629531608, 127.06576436811264 ? z=16")); // 뚝섬
                        startActivity(intent);
                        break;
                    case 3:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.54301015052212, 126.90091044398747 ? z=16")); // 선유도공원
                        startActivity(intent);
                        break;
                    case 4:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.56672967956453, 127.00942744557068 ? z=16")); // DDP
                        startActivity(intent);
                        break;
                    case 5:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.53846826506214, 127.12374560445959 ? z=16")); // 강동구 천호지하차도
                        startActivity(intent);
                        break;
                    case 6:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:35.14664943478774, 126.84853226878099 ? z=16")); // 상무역
                        startActivity(intent);
                        break;
                    case 7:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:35.13946498032422, 126.92285799761665 ? z=16")); // 남광주역
                        startActivity(intent);
                        break;
                    case 8:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.48738334790372, 127.10131376885049 ? z=16")); // 수서역
                        startActivity(intent);
                        break;
                    case 9:
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:37.5566265586132, 126.97055012652433 ? z=16")); // 서울로 7017
                        startActivity(intent);
                        break;
                }
            }
        });
    }
}
