
var products = {
    'white': {
        
        'plain': {
            'unit_price': 290,
            'photo': 'plain white.png' 
        },
        'printed': {
            'unit_price': 390,
            'photo': 'printed white.png' 
        }
    },

    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 650,
            'photo': 'red t shirts.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:

$(function() {

    //$("#quantity").val()
    //$("#style").val()
    //$("#color  .option-button.selected").attr('id');
    //$("#quality  .option-button.selected").attr('id');

     function update_params() {
        search_params.quantity = parseInt($("#quantity").val() );
        search_params.color =$("#color  .option-button.selected").attr('id');
        search_params.quality=$("#quality  .option-button.selected").attr('id');
        search_params.style =$("#style").val()
        console.log(search_params);

        update_order_details();
    
    }

     function update_order_details() {

        var qualityId = "#" + search_params.quality;
        $("#result-quality").html( $(qualityId).text() );

        var colorId = "#" + search_params.color;
        $("#result-color").html( $(colorId).text() );


        $("#result-quantity").html(search_params.quantity );

        
         var styleSelector = "#style option[value=" + search_params.style + "]";
         console.log(styleSelector);
         $("#result-style").html($(styleSelector).text());
        
         var orderTotal = calculate_total();
         $("#total-price").text ( orderTotal );
         
         var photoUrl  ="img/"+ products[search_params.color] [search_params.style].photo;

         $("#photo-product").attr("src",  photoUrl);

         }

     function calculate_total() {

        var unitPrice  = products[search_params.color] [search_params.style].unit_price;

        if (search_params.quality=="q190") {
            unitPrice  *= 600;
            

        }

        var total  = unitPrice * search_params.quantity;

        if( search_params.quantity >= 1000) {

            total *=0.8;
         }

        else if ( search_params.quantity >= 500){
           total *= 0.88;

        }

        else if ( search_params.quantity >= 100){
            total *= 0.95;
 
         }

         return total;
         
        }


      update_params();

      $("#quantity").change(function() {

        search_params.quantity = parseInt($("#quantity").val() );
        update_order_details();

      });

        $("#style").change(function() {

            search_params.style =$("#style").val();
            update_order_details();

        } );

        $(" .option-button").click(function() {

            var clickedParam = $(this).parent().attr("id");
            var childSelector = "#" +  clickedParam + " .option-button";
            $(childSelector).removeClass("selected");
            $(this).addClass("selected");
            var selectedChild = "#" + clickedParam + " .option-button-selected";
            search_params[clickedParam] =  $(selectedChild).attr('id');
            update_order_details();

    
        } );

          });

         


