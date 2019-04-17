beforeEach(function () {
    jasmine.addMatchers({
      toBeSorted: function () {
        return {
          compare: function (actual) {
            var sorted = true;
            var closest = actual[0].value;
            for (i = 1; i < actual.length; i++) {
              if (actual[0].value > actual[i].value || actual[i-1].value > actual[i].value) {
                  sorted = false;
                  break;
              }
            }
            return {
              pass: sorted
            };
          }
        };
      }
    });
  });
  describe("Test Distances class", function() {
    var distances;
    var dots;
    var dots3;
    var x;
    var y;
    var x1;
    var y1;
    
    beforeEach(function() {
      distances = new Distances();
    });
    
    describe("when coordinates of the two points are given", function() {
      beforeEach(function() {
          x = 1;
          y = 2;
          x1 = 3;
          y1 = 4;
      });
      it("should calculate the distance", function() {
          expect(distances.distance([0,0],[0,0])).toEqual(0);
          expect(distances.distance([0,0],[0,3])).toEqual(3);
          expect(distances.distance([0,0],[3,3])).toEqual(4.24);
      });
      it("should preserve the distance when affine transformations applied", function() {
          expect(distances.distance([x,y],[x1,y1])).toEqual(distances.distance([x+x,y],[x1+x,y1]));
          expect(distances.distance([0,0],[x,y])).toEqual(distances.distance([x+1,y+1],[2*x+1,2*y+1]));
      });
    });
    
    describe("when JSON array with 3 points is given", function() {
      beforeEach(function() {
          dots3 = '[{"id":"a","value":"31,49"},{"id":"b","value":"44,67"},{"id":"c","value":"93,6"}]';		
      });
      it("should generate array of 3 dots", function() {
          expect(distances.reorder(0,0,dots3).length).toEqual(3);
      });
      it("should return reordered array with nearest distances come first", function() {
          expect(distances.reorder(0,0,dots3)).toBeSorted();
      });
    });  
    
    describe("when JSON array given", function() {
      beforeEach(function() {
          dots = '[{"id":"a","value":"31,49"},{"id":"b","value":"44,67"},{"id":"c","value":"93,6"},{"id":"d","value":"20,16"},{"id":"e","value":"68,53"},{"id":"f","value":"71,8"},{"id":"g","value":"61,90"},{"id":"h","value":"34,97"},{"id":"i","value":"21,63"},{"id":"j","value":"19,84"},{"id":"k","value":"0,81"},{"id":"l","value":"6,76"},{"id":"m","value":"43,64"},{"id":"n","value":"18,64"},{"id":"o","value":"10,61"},{"id":"p","value":"37,27"},{"id":"q","value":"44,88"},{"id":"r","value":"75,63"},{"id":"s","value":"99,46"},{"id":"t","value":"28,51"},{"id":"u","value":"88,79"},{"id":"v","value":"47,21"},{"id":"w","value":"18,66"},{"id":"x","value":"84,100"},{"id":"y","value":"75,92"},{"id":"z","value":"32,33"}]';
      });
      it("should return reordered array with nearest distances come first", function() {
          expect(distances.reorder(0,0,dots3)).toBeSorted();
      });
    });   
  
  });
  