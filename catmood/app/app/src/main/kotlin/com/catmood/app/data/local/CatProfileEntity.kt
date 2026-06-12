package com.catmood.app.data.local

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "cat_profiles")
data class CatProfileEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0L,
    @ColumnInfo(name = "name") val name: String,
    @ColumnInfo(name = "breed") val breed: String?,
    @ColumnInfo(name = "photo_uri") val photoUri: String?,
)
