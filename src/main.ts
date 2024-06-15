/**
 * App: Represents the main application instance of Obsidian.
 *
 * Plugin: The base class for all plugins in Obsidian.
 *
 * PluginSettingTab: A class used to create a settings tab in the Obsidian settings.
 *
 * Setting: A helper class to create settings controls (like text inputs).
 *
 * Notice: Used to display notifications in Obsidian.
 *
 * axios: A promise-based HTTP client for making API requests.
 */

import { App, Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';
import axios from 'axios';

interface HabiticaPluginSettings {
  apiToken: string;
  userId: string;
}

const DEFAULT_SETTINGS: HabiticaPluginSettings = {
  apiToken: '',
  userId: ''
}

/**
 * HabiticaPlugin: The main class of your plugin. It extends the Plugin class provided by Obsidian.
 * settings: A property to hold the plugin settings.
 */

export default class HabiticaPlugin extends Plugin {
  settings: HabiticaPluginSettings;

/**
 * onload(): This method is called when the plugin is loaded.
 *
 * console.log('Loading Habitica Plugin'): Logs a message to the console for debugging purposes.
 *
 * await this.loadSettings(): Asynchronously loads the plugin settings.
 *
 * this.addSettingTab(new HabiticaSettingTab(this.app, this)): Adds a new settings tab to the Obsidian settings, using the HabiticaSettingTab class.
 *
 * this.addRibbonIcon('checkmark', 'Sync with Habitica', async () => { ... }): Adds a ribbon icon to the Obsidian UI. When clicked, it will trigger a notification and (in the future) sync logic.
 */

async onload() {
    console.log('Loading Habitica Plugin');

    await this.loadSettings();

    this.addSettingTab(new HabiticaSettingTab(this.app, this));

    this.addRibbonIcon('checkmark', 'Sync with Habitica', async () => {
      new Notice('Syncing with Habitica...');
      // TODO: Implement the sync logic here
    });
  }

  /**
   * onunload(): This method is called when the plugin is unloaded.
   *
   * console.log('Unloading Habitica Plugin'): Logs a message to the console for debugging purposes.
   */

  onunload() {
    console.log('Unloading Habitica Plugin');
  }

  /**
   * loadSettings(): Asynchronously loads the plugin settings from Obsidian and merges them with the default settings.
   *
   * this.settings: The loaded settings are assigned to this property.
   *
   * Object.assign({}, DEFAULT_SETTINGS, await this.loadData()): Merges the default settings with the loaded settings.
   *
   * saveSettings(): Asynchronously saves the current settings to Obsidian.
   *
   * await this.saveData(this.settings): Saves the current settings.
   */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

/**
 * HabiticaSettingTab: A class to create a settings tab in the Obsidian settings.
 *
 *  plugin: A reference to the main plugin instance.
*/

class HabiticaSettingTab extends PluginSettingTab {
  plugin: HabiticaPlugin;

  /**
   * constructor(app: App, plugin: HabiticaPlugin): Initializes the settings tab with the app and plugin instances.
   * @param app blah
   * @param plugin junk
   */
  constructor(app: App, plugin: HabiticaPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
  * display(): This method is called to render the settings tab.
  *
  * containerEl.empty(): Clears the existing contents of the settings tab.
  *
  * containerEl.createEl('h2', { text: 'Habitica Plugin Settings' }): Adds a header to the settings tab.
  *
  * new Setting(containerEl): Creates a new setting control.
  *
  * setName('API Token'): Sets the name of the setting.
  *
  * setDesc('Your Habitica API Token'): Sets the description of the setting.
  *
  * addText(...): Adds a text input control.
  *
  * setPlaceholder('Enter your API token'): Sets the placeholder text for the input.
  *
  * setValue(this.plugin.settings.apiToken): Sets the initial value of the input to the current API token.
  *
  * onChange(async (value) => { ... }): Adds an event listener to handle changes to the input value. When the value changes, it updates the settings and saves them.
  */

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Habitica Plugin Settings' });

    new Setting(containerEl)
      .setName('API Token')
      .setDesc('Your Habitica API Token')
      .addText(text => text
        .setPlaceholder('Enter your API token')
        .setValue(this.plugin.settings.apiToken)
        .onChange(async (value) => {
          this.plugin.settings.apiToken = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('User ID')
      .setDesc('Your Habitica User ID')
      .addText(text => text
        .setPlaceholder('Enter your User ID')
        .setValue(this.plugin.settings.userId)
        .onChange(async (value) => {
          this.plugin.settings.userId = value;
          await this.plugin.saveSettings();
        }));
  }
}
