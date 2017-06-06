/* eslint-env mocha */



//TODO: rewrite the `it` titles and use "" on strings







import 'babel-polyfill';
import assert from 'assert';

import Markdown from '../newMarkdownClass';

const escapeHtml = function(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

let markdown;
beforeEach(() => {
	markdown = new Markdown('http|https', true, true);
});

describe.only('[Markdown]', () => {
	describe('[Bold Markdown]', () => {
		describe('Should Parse:', () => {
			[
				'*Hello*',
				'**Hello**',
				'*Hello**',
				'**Hello*'
			].forEach(text => {
				it(`it should return a html with the <strong> tag when sending the string ${ text }`, () => {
					assert.strictEqual(markdown.parseBold(text), `<span class="copyonly">*</span><strong>${ text.replace(/\*/g, '') }</strong><span class="copyonly">*</span>`);
				});
			});
		});

		describe('Should NOT Parse: ', () => {
			[
				'Hello',
				'*Hello',
				'Hello*',
				'He*llo',
				'***Hello***',
				'***Hello**',
				'_Hello_',
				'`Hello`'
			]
			.forEach(text => {
				it(`it should NOT return a html with the <strong> tag when sending the string ${ text }`, () => {
					assert.notStrictEqual(markdown.parseBold(text), `<span class="copyonly">*</span><strong>${ text.replace(/\*/g, '') }</strong><span class="copyonly">*</span>`);
				});
			});
		});

		describe('Should Partially Parse: ', () => {
			[
				'*Hello* this is dog',
				'Rocket cat says *Hello*',
				'He said *Hello* to her',
				'**Hello** this is dog',
				'Rocket cat says **Hello**',
				'He said **Hello** to her'
			].forEach(text => {
				it('it should return a string containing a <strong> html tag when sending the string Hello', () => {
					assert.equal(markdown.parseBold(text).includes('<span class="copyonly">*</span><strong>Hello</strong><span class="copyonly">*</span>'), true);
				});
			});
		});
	});

	describe('[Italic Markdown]', () => {
		describe('Should Parse:', () => {
			[
				'_Hello_',
				'_Hi_',
				'_Rocket.Cat_'
			].forEach(text => {
				it(`it should return a html with the <em> tag when sending the string ${ text }`, () => {
					assert.strictEqual(markdown.parseItalic(text), `<span class="copyonly">_</span><em>${ text.replace(/\_/g, '') }</em><span class="copyonly">_</span>`);
				});
			});
		});

		describe('Should Not Parse:', () => {
			[
				'*Hello*',
				'__Hello__',
				'He_llo',
				'_Hello',
				'Hello_'
			].forEach(text => {
				it(`it should not return a html with the <em> tag when sending the string ${ text }`, () => {
					assert.notStrictEqual(markdown.parseItalic(text), `<span class="copyonly">_</span><em>${ text.replace(/\_/g, '') }</em><span class="copyonly">_</span>`);
				});
			});
		});

		describe('Should Partially Parse:', () => {
			[
				'_Hello_ this is dog',
				'Rocket cat says _Hello_',
				'He said _Hello_ to her'
			].forEach(text => {
				it(`it should return a string containing a <em> html tag when sending the string ${ text }`, () => {
					assert.equal(markdown.parseItalic(text).includes('<span class="copyonly">_</span><em>Hello</em><span class="copyonly">_</span>'), true);
				});
			});
		});
	});

	describe('[Strike Markdown]', () => {
		describe('For Strike text:', () => {
			[
				'~Hello~',
				'~~Hello~~',
				'~Hello~~',
				'~~Hello~'
			].forEach(text => {
				it(`it should return a <strike> tag when sending "${ text }"`, () => {
					assert.strictEqual(markdown.parseStrike(text), `<span class="copyonly">~</span><strike>${ text.replace(/\~/g, '') }</strike><span class="copyonly">~</span>`);
				});
			});
		});

		describe('For Other text and mardowns', () => {
			[
				'Hello~',
				'~Hello',
				'_Hello_',
				'*Hello*',
				'He~llo'
			].forEach(text => {
				it(`it should return  ${ text }`, () => {
					assert.strictEqual(markdown.parseStrike(text), text);
				});
			});
		});

		describe('For Partially Strike Text:', () => {
			[
				'~Hello~ this is dog',
				'Rocket cat says ~Hello~',
				'He said ~Hello~ to her'
			].forEach(text => {
				it(`it should return a string containing a <strike> tag when sending "${ text }"`, () => {
					assert.strictEqual(markdown.parseStrike(text).includes('<span class="copyonly">~</span><strike>Hello</strike><span class="copyonly">~</span>'), true);
				});
			});
		});
	});


	describe('[Header Markdown]', () => {
		describe('[H1]', () => {
			describe('For First Level Headers:', () => {
				[
					'# Hello',
					'# Rocket.Cat',
					'# Hi',
					'# Hello this is dog',
					'# Rocket cat says Hello',
					'# He said Hello to her'
				].forEach(text => {
					it(`it should return a <h1> tag when sending the string ${ text }`, () => {
						assert.strictEqual(markdown.parseH1(text), `<h1>${ text.replace(/\# /g, '') }</h1>`);
					});
				});
			});

			describe('For Other text and Headers: ', () => {
				[
					'#Hello',
					'#Hello#',
					'He#llo',
					'## Hi',
					'### Rocket.Cat',
					'#### Rocket.Chat'
				].forEach(text => {
					it(`it should return ${ text }`, () => {
						assert.strictEqual(markdown.parseH1(text), text);
					});
				});
			});
		});

		describe('[H2]', () => {
			describe('For Second Level Headers:', () => {
				[
					'## Hello',
					'## Rocket.Cat',
					'## Hi',
					'## Hello this is dog',
					'## Rocket cat says Hello',
					'## He said Hello to her'
				].forEach(text => {
					it(`it should return a <h2> tag when sending the string ${ text }`, () => {
						assert.strictEqual(markdown.parseH2(text), `<h2>${ text.replace(/\## /g, '') }</h2>`);
					});
				});
			});

			describe('For Other text and Headers:', () => {
				[
					'##Hello',
					'##Hello##',
					'He##llo',
					'# Hi',
					'### Rocket.Cat',
					'#### Rocket.Chat'
				].forEach(text => {
					it(`it should return ${ text }`, () => {
						assert.strictEqual(markdown.parseH2(text), text);
					});
				});
			});
		});

		describe('[H3]', () => {
			describe('For Third Level Headers:', () => {
				[
					'### Hello',
					'### Rocket.Cat',
					'### Hi',
					'### Hello this is dog',
					'### Rocket cat says Hello',
					'### He said Hello to her'
				].forEach(text => {
					it(`it should return a <h3> tag when sending the string ${ text }`, () => {
						assert.strictEqual(markdown.parseH3(text), `<h3>${ text.replace(/\### /g, '') }</h3>`);
					});
				});
			});

			describe('For Other text and Headers:', () => {
				[
					'###Hello',
					'###Hello###',
					'He###llo',
					'# Hi',
					'## Rocket.Cat',
					'#### Rocket.Chat'
				].forEach(text => {
					it(`it should return  ${ text }`, () => {
						assert.strictEqual(markdown.parseH3(text), text);
					});
				});
			});
		});

		describe('[H4]', () => {
			describe('For Fourth Level Headers:', () => {
				[
					'#### Hello',
					'#### Rocket.Cat',
					'#### Hi',
					'#### Hello this is dog',
					'#### Rocket cat says Hello',
					'#### He said Hello to her'
				].forEach(text => {
					it(`it should return a <h4> tag when sending the string ${ text }`, () => {
						assert.strictEqual(markdown.parseH4(text), `<h4>${ text.replace(/\#### /g, '') }</h4>`);
					});
				});
			});

			describe('For Other text and Headers:', () => {
				[
					'####Hello',
					'####Hello####',
					'He####llo',
					'# Hi',
					'## Rocket.Cat',
					'### Rocket.Chat'
				].forEach(text => {
					it(`it should return ${ text }`, () => {
						assert.strictEqual(markdown.parseH4(text), text);
					});
				});
			});
		});
	});

	describe('[Quote Markdown]', () => {
		describe('For Inline Quotes:', () => {
			[
				'>Hello',
				'>Rocket.Cat',
				'>Hi',
				'> Hello this is dog',
				'> Rocket cat says Hello',
				'> He said Hello to her'
			].forEach(text => {
				it(`it should return a <blockquote> tag when sending the string ${ text }`, () => {
					assert.strictEqual(markdown.parseQuote(escapeHtml(text)), `<blockquote class="background-transparent-darker-before"><span class="copyonly">&gt;</span>${ text.replace(/\>/g, '') }</blockquote>`);
				});
			});
		});

		describe('For Simple Text, not quotes:', () => {
			[
				'<Hello',
				'<Rocket.Cat>',
				' >Hi',
				'Hello > this is dog',
				'Roc>ket cat says Hello',
				'He said Hello to her>'
			].forEach(text => {
				it(`it should return ${ text }`, () => {
					assert.strictEqual(markdown.parseQuote(escapeHtml(text)), escapeHtml(text));
				});
			});
		});
	});

	describe('[Remove Whitespace]', () => {
		describe('From Quotes:', () => {
			const quote = '<blockquote class="background-transparent-darker-before"><span class="copyonly">&gt;</span> </blockquote>';
			it('it should remove the whitespace outside the tags', () => {
				assert.strictEqual(markdown.removeWhiteSpaceBlockQuote(`   ${ quote }   `), quote);
			});
		});
	});

	describe('[Remove Newline]', () => {
		describe('From Quotes:', () => {
			const quote = '<blockquote class="background-transparent-darker-before"><span class="copyonly">&gt;</span></blockquote>';
			it('it should remove the whitespace outside the tags', () => {
				assert.strictEqual(markdown.removeWhiteSpaceBlockQuote(`${ quote }\n`), quote);
			});
		});
	});

	describe('[Link Markdown]', () => {
		describe('[Simple Link]', () => {
			describe('For Text Links:', () => {
				[
					'<http://link|Text>',
					'<https://demo.rocket.chat/|Demo Site For Rocket.Chat>',
					'<https://demo.rocket.chat/ | Demo Site For Rocket.Chat>',
					'<https://rocket.chat/|Rocket.Chat Site>',
					'<https://rocket.chat/docs/developer-guides/testing/#testing|Testing Entry on Rocket.Chat Docs Site>'
				].forEach(text => {
					const title = text.match(/\|(.*[^<>])/)[1];
					const link = text.match(/http*[^<>|]*/);

					it(`it should return <a> tag with the adress ${ link } and the title ${ title }`, () => {
						assert.strictEqual(markdown.parseLink(escapeHtml(text)), `<a href="${ link }" target="_blank">${ title }</a>`);
					});
				});
			});

			describe('For Simple Links and not Links, no title ', () => {
				[
					'<http://linkText>',
					'<https:demo.rocket.chat/ | Demo Site For Rocket.Chat>',
					'https://demo.rocket.chat/|Demo Site For Rocket.Chat',
					'<www.demo.rocket.chat/|Demo Site For Rocket.Chat>',
					'<htps://rocket.chat/|Rocket.Chat Site>',
					'<ttps://rocket.chat/|Rocket.Chat Site>',
					'<tps://rocket.chat/|Rocket.Chat Site>',
					'<demo.rocket.chat/|Demo Site For Rocket.Chat>',
					'<htts://rocket.chat/docs/developer-guides/testing/#testing|Testing Entry on Rocket.Chat Docs Site>'
				].forEach(text => {
					it(`it should return ${ text }`, () => {
						assert.strictEqual(markdown.parseLink(escapeHtml(text)), escapeHtml(text));
					});
				});
			});

		});

	});

});


