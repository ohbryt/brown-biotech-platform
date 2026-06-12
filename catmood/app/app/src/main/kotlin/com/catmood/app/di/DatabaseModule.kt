package com.catmood.app.di

import android.content.Context
import androidx.room.Room
import com.catmood.app.data.local.AnalysisDao
import com.catmood.app.data.local.AppDatabase
import com.catmood.app.data.local.CatProfileDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        Room.databaseBuilder(context, AppDatabase::class.java, AppDatabase.NAME)
            .build()

    @Provides
    fun provideAnalysisDao(db: AppDatabase): AnalysisDao = db.analysisDao()

    @Provides
    fun provideCatProfileDao(db: AppDatabase): CatProfileDao = db.catProfileDao()
}
