/**
 * header
 *  - logo
 *  - nav items
 * 
 * body
 *  - search
 *  - restaurant container
 *  - restaurant card
 * 
 * footer
 *  - copyright
 *  - links
 *  - address
 *  - contact
 */


/**
*   this happens becuase the DOM is th emost expensive so it happens in the commit phase after the complete rendering, thats why it groups the render and then *   componentDidMount is called
*
*   parent constructor
*   parent render
*   
*   child 1 constructor
*   child 1 render
*
*   child 2 constructor
*   child 2 renders
*
*   child 1 componentDidMount
*   child 2 componentDidMount
*   
*   parent componentDidMount
*/