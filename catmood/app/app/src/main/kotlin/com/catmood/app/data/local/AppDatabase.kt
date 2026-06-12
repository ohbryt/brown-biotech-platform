package com.catmood.app.data.local

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [AnalysisResultEntity::class, CatProfileEntity::class],
    version = 1,
    exportSchema = false,
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun analysisDao(): AnalysisDao
    abstract fun catProfileDao(): CatProfileDao

    companion object {
        const val NAME = "catmood.db"
    }
}
