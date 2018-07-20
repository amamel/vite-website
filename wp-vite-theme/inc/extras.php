function create_body_classes( $classes ) {

    // Adds classes hfeed and archive-view to non-singular pages.
    if ( ! is_singular() ) {
        $classes[] = 'hfeed archive-view';
    }
    return $classes;
}
add_filter( 'body_class', 'create_body_classes' );