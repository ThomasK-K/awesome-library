pluginManagement {
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://repo.maven.apache.org/maven2/")
        }
        maven {
            url = uri("https://oss.sonatype.org/content/repositories/snapshots/")
        }
        maven {
            url = uri("https://maven.google.com")
        }
        maven {
            url = uri("https://plugins.gradle.org/m2/")
        }
        maven {
            url = uri("https://androidx.dev/storage/androidx-repository/")
        }
        maven {
            url = uri("https://artifacts.expo.dev/repo/")
        }
    }
}

buildscript {
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://artifacts.expo.dev/repo/")
        }
    }
}
