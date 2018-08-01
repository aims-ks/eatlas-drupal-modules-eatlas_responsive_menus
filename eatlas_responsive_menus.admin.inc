<?php

// NOTE: All those settings are saved in Drupal variables using "eatlas_responsive_menus_" prefix.
//   They must be defined in "eatlas_responsive_menus_create_empty_settings()"
function _eatlas_responsive_menus_settings() {
	$settings = eatlas_responsive_menus_load_settings();

	// From the "menu" module (core)
	//   https://api.drupal.org/api/drupal/modules%21menu%21menu.module/function/menu_get_menus/7
	$menus_options = menu_get_menus();

	// https://api.drupal.org/api/drupal/developer%21topics%21forms_api_reference.html/7
	$form = array();

	// NOTE: $branding_options should never be empty, there will always
	//   be at least the branding associated with the current form.
	if (!empty($menus_options)) {
		$form['menus'] = array(
			'#title' => t('Responsive menus'),
			'#description' => t('Menus that should collapse into a button when screen goes too small.'),
			'#type' => 'checkboxes',
			'#default_value' => property_exists($settings, 'menus') && !empty($settings->menus) ? $settings->menus : array(),
			'#options' => $menus_options
		);
	}

	$form['actions'] = array('#type' => 'actions');
	$form['actions']['submit'] = array(
		'#type' => 'submit',
		'#value' => t('Save')
	);

	return $form;
}

function _eatlas_responsive_menus_settings_submit($form, &$form_state) {
	$settings = eatlas_responsive_menus_create_empty_settings();

	foreach ($settings as $key => $value) {
		if (isset($form_state['values'][$key]) && !empty($form_state['values'][$key])) {
			$new_value = $form_state['values'][$key];
			$settings->{$key} = $new_value;
		}
	}

	eatlas_responsive_menus_save_settings($settings);
}

?>
