<?php
/**
 * Plugin Name:       Slothtenberg Image (Gutenberg Block)
 * Description:       Bloque para uso de imagen.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            SlothGeek
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slothtenberg-image
 *
 * @package           sg-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function sg_block_slothtenberg_image_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'sg_block_slothtenberg_image_block_init' );

function sg_block_slothtenberg_image_set_script_translations() {
	wp_set_script_translations( 'sg-block-slothtenberg-image-language', 'slothtenberg-image', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'sg_block_slothtenberg_image_set_script_translations' );
