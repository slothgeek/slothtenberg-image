/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { IconButton, Icon, Button, Popover, __experimentalInputControl as InputControl, PanelBody, TextareaControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	let popoverLink = "";

	const togglePopover = () => {
		setAttributes( { popoverVisible: !attributes.popoverVisible } )
	}

	const settings = () => {
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Configuración', 'slothtenberg-image' ) } initialOpen={ true }>
					<TextareaControl
						label="Alt"
						help={ __('Texto alternativo para la imagen', 'slothtenberg-image') }
						value={ attributes.graphic.alt }
						onChange={ ( text ) => setAttributes( { graphic:{...attributes.graphic, alt: text } } ) }
					/>
					<div>
						<p>{ __('Dimensiones de la imagen', 'slothtenberg-image')}</p>
						<div className="size-controls" >
							<InputControl
								label={__('Ancho', 'slothtenberg-image')}
								value={ attributes.width }
								type="number"
								onChange={ ( value ) => setAttributes({width:value}) }
							/>
							<InputControl
								label={__('Altura', 'slothtenberg-image')}
								value={ attributes.height }
								type="number"
								onChange={ ( value ) => setAttributes({height:value}) }
							/>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
		)
	}

	const getImageButton = (openEvent, url, alt, width, height) => {
		if(url) {
			return (
				<div className='graphic-picker-with-image'>
					<img
						src={ url }
						className="image"
						alt={alt}
						width={ width }
						height={ height }
					/>
					<div className="toolbar">
						<IconButton
							icon="edit"
							label={__('Edit', 'slothtenberg-image')}
							onClick={ openEvent }
						/>
						<IconButton
							icon="trash"
							label={__('Delete', 'slothtenberg-image')}
							onClick={ () => { setAttributes({graphic: {} }) }    }
						/>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className="graphic-picker-no-image"  >
					<header style={{display:"flex", alignItems:"center", marginBottom:16}}>
						<Icon icon="format-image" style={{marginRight:10}}/>
						{ __( 'Imagen', 'slothtenberg-image' ) }
					</header>

					<Button
						className="is-primary"
						onClick={openEvent}
					>
						{ __("Subir", "slothtenberg-image") }
					</Button>
					<div>
						<Button
							className="is-tertiary"
							onClick={ () => { togglePopover()  }}
						>
							{ __("Insertar desde un URL ", "slothtenberg-image") }
						</Button>
						{
							attributes.popoverVisible &&
							<Popover
								className="popoverLink"
								position="bottom center"
								onFocusOutside={ () => {togglePopover()} }
							>
								<div style={{ width:300, display:"flex"}}>
									<InputControl
										value={ attributes.graphic.url }
										onChange={ ( nextValue ) => { popoverLink = nextValue } }
									/>
									<IconButton
										icon= "yes"
										label={ __("Asignar", "slothtenberg-image") }
										onClick={ () => { setAttributes( { graphic: { ...attributes.graphic, url:popoverLink } } ) } }
									/>
									<IconButton
										icon= "no-alt"
										label={ __("Cerrar", "slothtenberg-image") }
										onClick={ () => { togglePopover() } }
									/>
								</div>

							</Popover>
						}
					</div>

				</div>

			);
		}
	};

	return (
		<div { ...useBlockProps() }>
			{ settings() }
			<MediaUpload
				className="center-align"
				onSelect={ (media) => { setAttributes( {graphic:{url: media.url, alt: media.alt}} ) } }
				type="image"
				render={ ({ open }) => getImageButton(open, attributes.graphic.url, attributes.graphic.alt, attributes.width, attributes.height) }
			/>
		</div>
	);
}
