var	menu   = document.getElementById('menu'),
	menuBt = document.getElementById('bt-menu-mobile'),
	lyrics = document.getElementById('lyrics'),
	lyricsBt = document.getElementById('see-lyrics'),
	url = document.URL,
	section;

function init(){

	section = url.match( /([^\\\/:*?\"<>|]+)$/g )[ 0 ].replace('.html', '');

	menuBt.addEventListener( 'click', openMenu, false );
	menu.getElementsByClassName( section )[ 0 ].addClassName( 'selected' );

	
	if( section == 'musicas') setLyrics();
	
};

function setLyrics(){

	lyricsBt.addEventListener( 'click', function(){

		lyrics.addClassName( 'block' );

		setTimeout( function(){

			lyrics.addClassName( 'o-1' );

		}, 100);

	}, false);


	lyricsBt.addEventListener( 'click', function(){

		lyrics.addClassName( 'block' );

		setTimeout( function(){

			lyrics.addClassName( 'o-1' );

		}, 100);

	}, false);


	var close = lyrics.getElementsByClassName( 'close' )[ 0 ];
	close.addEventListener( 'click', function(){

		lyrics.removeClassName( 'o-1' );

		setTimeout( function(){

			lyrics.removeClassName( 'block' );

		}, 1000);

	}, false);

};

function openMenu(){

	if( !menu.hasClassName( 'h-0' ) && !menu.hasClassName( 'menu-open' ) ){

		menu.addClassName( 'menu-open' );

	} else {

		if( menu.hasClassName( 'h-0' ) )
			menu.removeClassName( 'h-0' ).addClassName( 'menu-open' );
		else
			menu.removeClassName( 'menu-open' ).addClassName( 'h-0' );

	}

};


Element.prototype.hasClassName = function(name) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }

    return this;
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }

    return this;
};

document.addEventListener("DOMContentLoaded", init, false);