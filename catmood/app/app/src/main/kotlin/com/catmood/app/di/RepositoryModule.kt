package com.catmood.app.di

import com.catmood.app.data.repository.AnalysisHistoryRepositoryImpl
import com.catmood.app.data.repository.CatProfileRepositoryImpl
import com.catmood.app.domain.repository.AnalysisHistoryRepository
import com.catmood.app.domain.repository.CatProfileRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindAnalysisHistoryRepository(
        impl: AnalysisHistoryRepositoryImpl,
    ): AnalysisHistoryRepository

    @Binds
    @Singleton
    abstract fun bindCatProfileRepository(
        impl: CatProfileRepositoryImpl,
    ): CatProfileRepository
}
