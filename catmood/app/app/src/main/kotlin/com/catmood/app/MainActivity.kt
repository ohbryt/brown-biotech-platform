package com.catmood.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.catmood.app.ui.navigation.CatMoodNavGraph
import com.catmood.core.designsystem.theme.CatMoodTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CatMoodTheme {
                CatMoodNavGraph()
            }
        }
    }
}
