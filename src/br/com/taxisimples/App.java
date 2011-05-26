package br.com.taxisimples;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import com.phonegap.DroidGap;

public class App extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		if (cm.getActiveNetworkInfo() == null) {
			new AlertDialog.Builder(this).setMessage("Para usar o Taxi Simples você precisa estar conectado!").setCancelable(false)
					.setNeutralButton("ok", new DialogInterface.OnClickListener() {
						public void onClick(DialogInterface dialog, int id) {
							App.this.loadUrl("file:///android_asset/www/blank.html");
							App.this.finish();
						}
					}).create().show();
		} else {
			super.loadUrl("file:///android_asset/www/index.html");
		}
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