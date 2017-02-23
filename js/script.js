$(function () {
	
	
	function randomString () {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		var i = 0;
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str; 
	}
	
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();
		
		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x'); 
			var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
			
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Wpisz nazwę karty")));
			});
			
			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);
			
			return $column;
		
		}
	}
	
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};
	
	function Card(description) {
		var self = this;
		this.id = randomString(); 
		this.description = description;
		this.$element = createCard();
		
		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x'); 
		
		
			$cardDelete.click(function(){
				self.removeCard(); 
			});

			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
		}
	}
	
	Card.prototype = {
		removeCard: function() {
			this.$element.remove(); 
		}
	};
	
	function Board(name) {
		var self = this; 
		this.id = randomString();
		this.name = name;
		this.$element = createBoard();
		
		function createBoard() {
			var $board= $('<div id = ' + self.name + '>').addClass('board');
			var $boardTitle = $('<h2>').addClass('board-title').text(self.name);
			var $boardColumnList = $('<ul>').addClass('column-list');
			var $boardDelete = $('<button>').addClass('btn-delete').text('x'); 
			var $boardAddColumn = $('<button>').addClass('add-column').text('Dodaj kolumnę');
			var $boardAddTab = $('#board-container').children('ul').append("<li id=" + self.name + "Tab><a href=#" + self.name + "><span>"+ self.name +"</span></a></li>");
			
			
			$boardDelete.click(function() {
				$("#"+self.name+"Tab").remove();
				self.removeBoard();
			});
			$boardAddColumn.click(function() {
			self.addColumn(new Column(prompt("Wpisz nazwę columny")));
			});
			
			$board.append($boardTitle)
				.append($boardDelete)
				.append($boardAddColumn)
				.append($boardColumnList);			
			return $board;
		}
		
	}
	
	
	Board.prototype = {
		addColumn: function(column) {
			this.$element.children('ul').append(column.$element);
			initSortable();
		},
		removeBoard: function() {
			this.$element.remove();
		}
	};
	
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
	
	var mainMenu = {
		name: 'Zestaw tablic kanban',
		addBoard: function(board) {
			this.$element.append(board.$element);
			initSortable();
		},
		$element: $("#main-manu #board-container")
	};
	
	$('.create-board').click(function(){
		var name = prompt('Wpisz nazwę kolumny');
		var board = new Board(name);
		mainMenu.addBoard(board);
		tabs.tabs("refresh");
		
		var activeTab = $(".ui-tabs-nav li:last").index(); console.log("activ:"+ activeTab);
		$("#board-container").tabs({active: activeTab});
		
	});
	
	var developBoard = new Board("Programowanie");
	var testBoard = new Board("Testy");
	var implementBoard = new Board("Wdrozenie");
	
	
	mainMenu.addBoard(developBoard);
	mainMenu.addBoard(testBoard);
	mainMenu.addBoard(implementBoard);
	
	var col1 = new Column("To do");
	var col2 = new Column("Doing");
	var col3 = new Column("Done");
	
	developBoard.addColumn(col1);
	developBoard.addColumn(col2);
	developBoard.addColumn(col3);
	
	var col21 = new Column("Do zrobienia");
	var col22 = new Column("W realizacji");
	var col23 = new Column("Zrobione");
	var col24 = new Column("Archive");
	
	testBoard.addColumn(col21);
	testBoard.addColumn(col22);
	testBoard.addColumn(col23);
	testBoard.addColumn(col24);
	
	var col31 = new Column("Awaiting");
	
	implementBoard.addColumn(col31)
	
	var card1 = new Card("Projekt wdrożenia");
	col31.addCard(card1);
	
	var card2 = new Card("Specyfikacja funkcjonalna");
	var card3 = new Card("Mockup");
	var card4 = new Card("Scenariusz testów");
	col3.addCard(card2);
	col2.addCard(card3);
	col22.addCard(card4);
	
	var tabs = $("#board-container").tabs();
	
	tabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
	
		

});
	