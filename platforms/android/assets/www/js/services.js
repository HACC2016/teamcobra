angular.module('app.services', [])

.service('$locationProperties', function() {
    var Location;
    
    return {
        getLoc: function() {
            return Location;
        },
        setLoc: function(latlng) {
            Location = latlng;
        }
    };
})

.service('$infoProperties', function() {
    var name;
    
    return {
        getNm: function() {
            return name;
        },
        setNm: function(nm) {
            name = nm;
        }
    };
});



