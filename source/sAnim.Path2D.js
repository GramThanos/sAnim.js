/*
 * sAnim Path2D extension v1.0.0
 * Simple Animations extension
 *
 *
 * MIT License
 *
 * Copyright (c) 2018 Grammatopoulos Athanasios-Vasileios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

if (typeof sAnim === 'undefined') {
	throw('Error : sAnim.Path2D failed to load because sAnim was not found.');
}
sAnim.Path2D = (function(){

    // Constructor
    function Path2D(pth, optns, step, end){
		optns = optns || {};
		
		// Save info
		this.d = {};
		// Anim scale
		this.d.sc = (typeof optns.scale === 'number') ? optns.scale : 1;
		// Anim path
		this.d.pth = this._initPath(pth, this.d.sc);
		// Anim path
		this.d.lens = this._initLens();
		this.d.len = this.d.lens[this.d.lens.length - 1][1];
		// Anim time
		this.d.tm = (typeof optns.time === 'number' && optns.time > 0) ? optns.time : 500;
		// Frames per second
		this.d.fps = (typeof optns.fps === 'number' && optns.fps > 0) ? optns.fps : 60;
		// Is loop
		this.d.lp = (optns.loop) ? true : false;
		// The sAnim
		this.d.a = false;
		
		// Save callbacks
		this.c = {
			stp : step,
			end : end || null
		};
		
		this._loop(false);
    };

    // Version
    Path2D.version = "v1.0.0";
	
	// Init path
	Path2D.prototype._initPath = function(path, scale) {
		var p = [];
		for (var i = 0; i < path.length; i++) {
			p.push([path[i][0] * scale, path[i][1] * scale]);
		}
		return p;
	}
	
	// Init lengths
	Path2D.prototype._initLens = function() {
		var lens = [];
		var sum = 0;
		var len;
		for (var i = 0; i < this.d.pth.length - 1; i++) {
			// Distance from A to B
			len = Math.sqrt(
				Math.pow(this.d.pth[i + 1][0] - this.d.pth[i][0], 2) + 
				Math.pow(this.d.pth[i + 1][1] - this.d.pth[i][1], 2)
			);
			sum += len;
			lens.push([len, sum]);
		}
		
		return lens;
	}
	
	// Loop animation
	Path2D.prototype._loop = function(auto) {
		if (this.d.a) {
			this.d.a.stop();
		}
		var that = this;
		var l = that.d.pth.length -1;
		this.d.a = new sAnim({from : 0, to : this.d.len, time : this.d.tm, fps : this.d.fps}, function(state) {
			for (var i = 0; i < l; i++) {
				if (state <= that.d.lens[i][1]) {
					var p = 1 - (that.d.lens[i][1] - state) / that.d.lens[i][0];
					that.c.stp(
						(that.d.pth[i][0] + (p * (that.d.pth[i + 1][0] - that.d.pth[i][0]))),
						(that.d.pth[i][1] + (p * (that.d.pth[i + 1][1] - that.d.pth[i][1])))
					);
					return;
				}
			}
		}, function(){
			if (that.d.lp) {
				that._loop(true);
			}
			else if (that.c.end) {
				that.c.end();
			}
		});
		if (auto) {
			this.d.a.start();
		}
	}
	
	// Start the anim
	Path2D.prototype.start = function() {
		if (this.d.a) {
			this.d.a.start();
		}
		return this;
	}
	
	// Pause the anim
	Path2D.prototype.pause = function() {
		if (this.d.a) {
			this.d.a.pause();
		}
		return this;
	}
	
	// Stop the anim
	Path2D.prototype.stop = function() {
		if (this.d.a) {
			this.d.a.stop();
		}
		return this;
	}

    // Return
    return Path2D;
})();
