package com.catmood.app.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.catmood.app.ui.audiorecord.AudioRecordScreen
import com.catmood.app.ui.audioresult.AudioResultScreen
import com.catmood.app.ui.catprofile.CatProfileScreen
import com.catmood.app.ui.history.HistoryScreen
import com.catmood.app.ui.home.HomeScreen
import com.catmood.app.ui.photoresult.PhotoResultScreen
import com.catmood.app.ui.settings.SettingsScreen

object CatMoodDestinations {
    const val HOME = "home"
    const val PHOTO_RESULT = "photo_result"
    const val AUDIO_RECORD = "audio_record"
    const val AUDIO_RESULT = "audio_result"
    const val HISTORY = "history"
    const val CAT_PROFILE = "cat_profile"
    const val SETTINGS = "settings"
}

@Composable
fun CatMoodNavGraph(
    navController: NavHostController = rememberNavController(),
) {
    NavHost(
        navController = navController,
        startDestination = CatMoodDestinations.HOME,
    ) {
        composable(CatMoodDestinations.HOME) {
            HomeScreen(
                onPhotoClick = { navController.navigate(CatMoodDestinations.PHOTO_RESULT) },
                onAudioClick = { navController.navigate(CatMoodDestinations.AUDIO_RECORD) },
                onHistoryClick = { navController.navigate(CatMoodDestinations.HISTORY) },
                onProfilesClick = { navController.navigate(CatMoodDestinations.CAT_PROFILE) },
                onSettingsClick = { navController.navigate(CatMoodDestinations.SETTINGS) },
            )
        }
        composable(CatMoodDestinations.PHOTO_RESULT) {
            PhotoResultScreen(onBack = { navController.popBackStack() })
        }
        composable(CatMoodDestinations.AUDIO_RECORD) {
            AudioRecordScreen(
                onBack = { navController.popBackStack() },
                onRecordingFinished = {
                    navController.navigate(CatMoodDestinations.AUDIO_RESULT) {
                        popUpTo(CatMoodDestinations.AUDIO_RECORD) { inclusive = true }
                    }
                },
            )
        }
        composable(CatMoodDestinations.AUDIO_RESULT) {
            AudioResultScreen(onBack = { navController.popBackStack() })
        }
        composable(CatMoodDestinations.HISTORY) {
            HistoryScreen(onBack = { navController.popBackStack() })
        }
        composable(CatMoodDestinations.CAT_PROFILE) {
            CatProfileScreen(onBack = { navController.popBackStack() })
        }
        composable(CatMoodDestinations.SETTINGS) {
            SettingsScreen(onBack = { navController.popBackStack() })
        }
    }
}
