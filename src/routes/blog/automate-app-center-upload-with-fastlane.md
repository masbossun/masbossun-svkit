---
title: Automate App Center Upload with Fastlane
date: "2021-05-29T08:37:24.835Z"
slug: automate-app-center-upload-with-fastlane
author: Ryan Setiagi
git: https://github.com/masbossun/masbossun-next/blob/main/_posts/automate-app-center-upload-with-fastlane.md
---

<figure>
<img alt="Photo by @truemaulik on Unsplash" src="https://images.unsplash.com/photo-1563884072595-24a1d9dd5647?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80" />
<figcaption>Photo by <a href="https://unsplash.com/@truemaulik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maulik Sutariya</a> on <a href="https://unsplash.com/s/photos/app?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

## Table of content

1. What is App Center
2. Create automation with Fastlane
3. App Center Android upload
4. App Center iOS upload
5. Verdict

## What is App Center

App Center is a platform to build, test, release and monitor apps. Like google play and apple appstore, we can also store apps on appcenter for releasing the app to the QA for testing.

### How to upload apps to App Center

Before we can upload an app, we need to create an "app" inside the appcenter dashboard. This "app" might have different specs based on "operating system", "platform", and we can also specify the "Release Type" for each "app".

Uploading an app in appcenter is quite simple, we just need to build and save the app file (.apk and .ipa) and then upload it to the appcenter. On the App Center dashboard, go to the "Distribute" → "Release" section, and then click "New Release". Each operating system might have a different upload step, like on iOS and android, it has the same "Upload", "Write release notes", "Set destinations", and "Review uploads", but specifically on iOS we need to review "Destination's Devices" after setting destinations, to make sure all devices already provisioned with the correct profiles.

For Android App, after we build the APK file, on the "Release" section click "New Release", select the apk file and upload, next write down the changes to the notes, and then choose the destinations, finally review the release and click the release button.

For iOS App, after we build the IPA file, basically it has the same step, but as I mentioned in the previous slide, after selecting destinations, App Center will prompt the information about all the devices on the selected destinations. Finally, after everything is correct we can review and release the app.

## Automate with fastlane

Fastlane is a set of tools to automate builds, with a lot of plugins to help automation run more smooth. In our case, we need Fastlane to do these things.

1. Build the app
2. Sign the app
3. Upload to App Center

There are things to provide, which are "Apple Developer Account" the one-for-all account also used for generating profiles and a "Git repository" to store our certificates. Fastlane Match is a tool for managing code signing on iOS, it can generate, download, install all the things we need for code signing. With Fastlane Match, we don't need to worry about how to manage the certificates and provisioning. We only need to set up all the certificates once, after that we can use them for everyone without re-generating new certificates.

We also need to [generate App Center API Token](https://appcenter.ms/settings/apitokens#), this token is used later on App Center upload automation. Click "New API Token" button, enter a bit of description and set the access to "Full Access", finally click "Add new API Token". You should copy and save this token right away, because after generating a token we can't access the token again.

#### Setup Fastlane

Before we make the automation scripts, we need to make sure every stuff is prepared. The First things to prepare are setting up Fastlane. To install run

```bash
brew install fastlane
```

or if you want to use ruby/gems directly, you can run

```bash
sudo gem install fastlane
```

Basically, there is no specific configuration for React Native project, Fastlane can still run on each operating system, thus we need to configure it separately.

> On this post, I am giving an example using React Native. You will notice i am use a lot of `cd android` or `cd ios` command, because both android and ios have specific native directories. So i am managed to integrate fastlane to works dedicated in specific OS not for React Native.

#### Fastlane Android Setups

Android setups are quite easy, we just need to initiate Fastlane inside `andorid` directory and everything will set automatically. To start just run

```bash
cd android
fastlane init
```

Fastlane CLI will prompt questions about our project like "App Package Name", etc. After the process finished, there will be a new directory and files that we are going to set up later on.

#### Fastlane iOS Setups

On iOS, the setup is not as simple as android, so make sure you pay close attention. The tricky parts are the code signing process. Code signing is required on iOS when distributing our app to users. It encourages that our app can be trusted and hasn’t been modified since it was last signed.

After all of the stuff prepared, we need to initiate Fastlane like we did on android, run

```bash
cd ios
fastlane init
```

The CLI will prompt the questions related to the apple developer account and also the URL to the git repository. Since we were already set up those things before, we just need to answer the prompt easily.

## App Center Android Upload

On previous slide, we want fastlane to just does three things, which are "build", "sign", and "upload". Right now, we don't have anything setup on the script to automate the build and upload. Fastfile is where our automation scripts written, it doesn't have file format but basically it is written using Ruby programming language. Now, open `/android/fastlane/fastfile`.

```ruby
platform :android do

	lane :appcenter_staging do
		#
		# We will write the scripts inside this scope.
		#
	end

end
```

We named the lane as `appcenter_staging` to describe what our scripts does. First step to include to the scripts is build and expect to return the APK file, on Fastlane we can use `gradle()` actions to that.

```ruby
platform :android do

	lane :appcenter_staging do
		gradle(
			task: ['clean', 'assemble'],
			flavor: 'Staging',
			build_type: 'Release'
		)
	end

end
```

On `gradle()` actions, it took some parameter that we need to specify. The `task` parameter is filled with one or more gradle task name, on our case, we need to clean the build folder with `clean` task and build apk file with `assemble` task. We also specify the `flavor` and `build_type` parameters because we have more than one environment. Some of the Fastlane actions will return variables after the process of the actions finished. On `gradle()` actions it returns several data like the path to apk or aab output file(s) that we will use on the upload process.

The next things we need to do are "sign" and "upload." Since the android signing process was done within gradle assemble, we don't need to do the manual signing. Thus, we can continue to the last step. To upload the APK, we will use a plugin called Fastlane Plugin Appcenter. The plugin is really straightforward, put `appcenter_upload()` actions block below the `gradle()` actions.

```ruby
platform :android do

	lane :appcenter_staging do
		gradle(
			task: ['clean', 'assemble'],
			flavor: 'Staging',
			build_type: 'Release'
		)
		appcenter_upload(
            api_token: "<the api token>",
            owner_name: "<the organization name>",
            app_name: "<the app name>",
            file: "#{lane_context[SharedValues::GRADLE_APK_OUTPUT_PATH]}",
            destinations: "<the destinations>",
            notify_testers: true,
            release_notes: sh("cat ../../APPCENTER.md"),
            upload_build_only: true
        )
	end

end
```

the parameters we specify on this appcenter actions are

- api_token, obtained by generating in the appcenter account
- owner_name, to specify which organization we want to upload
- app_name, to specify which app we want to upload
- file, the apk file we built before
- destinations, to specify which test groups we want to upload
- notify_testers, set to `true` to send email to the testers
- release_notes, set release notes from markdown file and print using `cat` shell command
- upload_build_only, set to `true` to prevent uploading metadata, because we don't put anything on appcenter rather than the app file.

Basically, those are pretty much everything we need to automate the build and upload android app. To run the automation, go to the android directory and either run

```bash
fastlane appcenter_staging
```

or

```bash
bundle exec fastlane appcenter_staging
```

After all process complete, fastlane will prompt the summary like this.

<figure>
<img alt="fastlane android summary" src="/images/post/fastlane-android-summary.png" />
<figcaption>fastlane android summary</figcaption>
</figure>

## App Center iOS Upload

Creating automation on iOS is simple as we did on Android, but on iOS, we need extra actions to configure the signing process. Open Fastlane file on iOS directory `ios/fastlane/fastfile`, and put this code.

```ruby
platform :ios do

	lane :appcenter_staging do
		#
		# We will write the scripts inside this scope.
		#
	end

end
```

The first action we want Fastlane to run at first is Fastlane Match. We want to make sure Fastlane configure our signing settings based on our app environment and flavour.

```ruby
platform :ios do

	lane :appcenter_staging do
		match(
			type: "adhoc",
			app_identifier: ["com.awesomeapp.staging"],
			readonly: true
		)
	end

end
```

The parameters we put on `match()` actions are

- type, we put `adhoc` as provisioning profile type. Another type we can set for these parameters is `appstore` and `development`. Since we want `.IPA` file to be uploaded in the Appcenter, we need to set it to `adhoc`
- app_identifier, to tell fastlane match which apps we want them to configure the signing process. Since we want to build and sign the staging app we put `com.awesomeapp.staging`.
- readonly, we set to `true` to prevent fastlane match generating new certificates or profiles

After signing action is complete, now we are going to write the build script. Still at the same file, add `build_app()` after `match()` action

```ruby
platform :ios do

	lane :appcenter_staging do
		match(
			type: "adhoc",
			app_identifier: ["com.awesomeapp.staging"],
			readonly: true
		)
		build_app(
            workspace: "awesomeapp.xcworkspace",
            scheme: "staging"
        )
	end

end
```

The parameters we put on this action are workspace which is our `.xcworkspace` file, it is required because we use cocoapods. Another parameter we need is a scheme, we put staging scheme for this.

Since I mention that we use cocoapods, we can put `cocoapods` action before the build process to make sure every modules are installed.

```ruby
platform :ios do

	lane :appcenter_staging do
		match(
			type: "adhoc",
			app_identifier: ["com.awesomeapp.staging"],
			readonly: true
		)
		cocoapods # that's pretty much it
		build_app(
            workspace: "awesomeapp.xcworkspace",
            scheme: "staging"
        )
	end

end
```

Last but not least, after signing and build process are done, we can get `.ipa` file from `build_app()` process with `#{lane_context[SharedValues::IPA_OUTOUT_PATH]}`. Now let's upload this file to appcenter.

```ruby
platform :ios do

	lane :appcenter_staging do
		match(
			type: "adhoc",
			app_identifier: ["com.awesomeapp.staging"],
			readonly: true
		)
		cocoapods
		build_app(
            workspace: "awesomeapp.xcworkspace",
            scheme: "staging"
        )
		appcenter_upload(
            api_token: "<the api token>",
            owner_name: "<the organization name>",
            app_name: "<the app name>",
            file: "#{lane_context[SharedValues::GRADLE_APK_OUTPUT_PATH]}",
            destinations: "<the destinations>",
            notify_testers: true,
            release_notes: sh("cat ../../APPCENTER.md"),
            upload_build_only: true
        )
	end

end
```

The `appcenter_upload()` action on iOS basically have the same parameter like on Android. Now we can run the command below to start the automation process. Make sure to run this script inside `ios` directory.

```bash
fastlane appcenter_staging
```

or

```bash
bundle exec fastlane appcenter_staging
```

After all process complete, fastlane will prompt the summary like this.

<figure>
<img alt="fastlane ios summary" src="/images/post/fastlane-ios-summary.png" />
<figcaption>fastlane iOS summary</figcaption>
</figure>

## Verdict

This Fastlane automation really helped us remove the hassle compared to manually building and uploading each app to the appcenter. With this automation we are also integrating all signing process on iOS especially using only one account, it will make migration and/or onboarding easier. No need to manually setups certificates and provisioning profiles.

Current build process took around 5 minutes for android and around 7 minutes for iOS on my M1 Macbook Pro. With this automation, we can either run on our own machine or can integrate with CI/CD systems. We can also automate the build and upload to Google Play and Apple Appstore Connect for further implementation.
