package br.com.taxisimples;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import com.phonegap.DroidGap;

public class App extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.layout.menu, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {

		case R.id.call: {
			super.loadUrl("file:///android_asset/www/index.html#/run/route");
			return true;
		}
		
		case R.id.history: {
			super.loadUrl("file:///android_asset/www/index.html#/run/history");
			return true;
		}
		
		case R.id.close: {
			finish();
			return true;
		}

		default:
			return super.onOptionsItemSelected(item);
		}
	}
}