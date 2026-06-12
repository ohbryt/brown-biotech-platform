package com.catmood.app.di

import com.catmood.app.data.mock.MockAudioAnalyzer
import com.catmood.app.data.mock.MockPhotoAnalyzer
import com.catmood.app.domain.analyzer.AudioAnalyzer
import com.catmood.app.domain.analyzer.PhotoAnalyzer
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Phase 0: MOCK analyzers behind the domain interfaces.
 * These bindings are replaced by LiteRT-backed implementations in
 * Phases 1 (photo) and 2 (audio) — only this module changes.
 */
@Module
@InstallIn(SingletonComponent::class)
abstract class AnalyzerModule {

    @Binds
    @Singleton
    abstract fun bindPhotoAnalyzer(impl: MockPhotoAnalyzer): PhotoAnalyzer

    @Binds
    @Singleton
    abstract fun bindAudioAnalyzer(impl: MockAudioAnalyzer): AudioAnalyzer
}
