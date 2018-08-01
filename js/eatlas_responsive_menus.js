// Define $ as jQuery
(function ($) {
	// Execute when the page is ready
	$(document).ready(function(){
		var responsive_menu_containers = $(this).find('.eatlas-responsive-menu-container');
		var accordion_menus = responsive_menu_containers.find('.accordion-menu');

		// Show / hide the menu by clicking the "menu" button
		responsive_menu_containers.find('.eatlas-responsive-menu-button').find('.eatlas-responsive-menu-button-image').click(function() {
			// Toggle the menu when the button is clicked
			// NOTE: Can not use "accordion_menus" here, we don't want to open ALL menus.
			var menu = $(this).parent().parent().find('.accordion-menu');
			if (menu.is(":visible")) {
				menu.slideUp();
			} else {
				menu.slideDown();
			}
		});

		// Prevent the browser from trying to load the link on 2nd level menu (collapsible sub-menus).
		//   It's annoying when the page jump up because the user has clicked
		//   on a link like 'href="#"'.
		responsive_menu_containers.find('.accordion-menu > .expanded > a').click(function(e) {
			e.preventDefault();
		});

		// Open the menu's active trail
		accordion_menus.find('.active-trail').each(function(index) {
			$(this).parent().show();
		});

		// Hide the accordion menus - the user will have to click the menu button to see it.
		accordion_menus.hide();

		// "accordion" menu logic for sub-menus ("slideUp" / "slideDown")
		responsive_menu_containers.each(function(index) {
			var responsive_menu_container = $(this);
			responsive_menu_container.find(".accordion-menu > li.expanded > a").click(function() {
				// Hide all the sub-menus (for the current accordion menu)
				responsive_menu_container.find(".accordion-menu > li > ul").slideUp();
				// Show the sub-menu below the clicked link, if it's closed
				var ul = $(this).next('ul');
				if (!ul.is(":visible")) {
					ul.slideDown();
				}
			});
		});
	});
})(jQuery);
