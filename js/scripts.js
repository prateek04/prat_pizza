$(function(){
  var finalPrice=0,
  total_bill=0;
  price_separate={
    'pizza':0,
    'extras':0,
    'sides_Dessert':0,
  },
  checkoutFlag=false;
  $(".order_butn").click(function() {
    $("#pizza-home").addClass('display-none');
    $(".customize").addClass('display-none');
    $('.menu_page').removeClass('display-none');
    $(".extras_pizza,.sides_D").addClass('display-none');

  });
  $(".pizza,.sides,.extras").click(function() {
    $(this).parent().find('.selected').removeClass('selected');
    if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
      if($(this).text()==='Pizza'){
        $(".extras_pizza").css('display','none');
        $('.customize,.sides_D').css('display','none');
        $('.pizza_menu').css('display','block');
        $('#amount').text('Rs '+finalPrice);
      }else if($(this).text()==='Sides & Desserts'){
        $(".sides_D").css('display','flex');
        $('.extras_pizza').css('display','none');
        $('.customize,.pizza_menu').css('display','none');
      }else{
        $(".extras_pizza").css('display','flex');
        $('.customize,.pizza_menu,.sides_D').css('display','none');
      }
    }
    if(!checkoutFlag){
      finalPrice=0;
    }
    $('#amount').text('Rs '+finalPrice);
    $('.overlay').addClass('display-none');
    removeSelectedProperties();
  });
  $(".veg_butn,.non_veg_butn").click(function(){
    $(".pizza_menu").css('display','none');
    $(".extras_pizza").css('display','none');
    $(".customize").removeClass('display-none');
    $(".customize").css('display','flex');
    finalPrice=itemPrice["Normal"];
    $('#amount').text('Rs '+finalPrice);
    if($(this).attr('class').indexOf('non_veg_butn')>-1){
      $('.pizza_veg_text').text('Supreme Non-Veg Pizza');
    }else{
      $('.pizza_veg_text').text('Supreme Veg Pizza');
    }

  });
  $('.pizz_acc').click(function(){
    var reqFlag=false,
    alertMessage='';
    if($(this).text().indexOf('Veggies')>-1){
      if($('.toppingsType .veg_selected').length ===0){
        reqFlag=true;
        alertMessage="Topping";
      }
    }
    if($(this).text().indexOf('Cheese')>-1){
      if($('.veggiesType .veggies_selected').length ===0){
        reqFlag=true;
        alertMessage="Veggie";
      }
    }
    if($(this).text().indexOf('Sauces')>-1){
      if($('.cheeseType .cheese_selected').length ===0){
        reqFlag=true;
        alertMessage="Cheese";
      }
    }
    if(!reqFlag){
      $(this).siblings().toggle('display-none');
    }else{
      alert('Please select atleast one '+alertMessage);
    }
  });
  $('.baseType li').click(function(){
    $(this).parent().find('.cust_selected').removeClass('cust_selected');
    if(!$(this).hasClass('cust_selected')){
      $(this).addClass('cust_selected');
      finalPrice=0;
      finalPrice=itemPrice[$(this).text()];
      $('#amount').text('Rs '+finalPrice);
    }
  });
  $('.cheeseType li').click(function(){
    if($(this).parent().find('.cheese_selected').length>0){
      finalPrice-=itemPrice[$(this).parent().find('.cheese_selected').text()];
    }
    $(this).parent().find('.cheese_selected').removeClass('cheese_selected');
    if(!$(this).hasClass('cheese_selected')){
      $(this).addClass('cheese_selected');
      finalPrice+=itemPrice[$(this).text()];
    }
    $('#amount').text('Rs '+finalPrice);
  });
  $('.toppingsType li').click(function(){
    var flag=false;
    if($(this).hasClass('veg_selected')){
      $(this).removeClass('veg_selected');
      finalPrice-=itemPrice[$(this).text()];
      flag=true;
    }
    if($('.toppingsType .veg_selected').length <3 && !flag){
      if(!$(this).hasClass('veg_selected')){
        $(this).addClass('veg_selected');
        finalPrice+=itemPrice[$(this).text()];
      }else{
        $(this).removeClass('veg_selected');
      }
    }else{
        $(this).removeClass('veg_selected');
    }
    $('#amount').text('Rs '+finalPrice);
  });
  $('.veggiesType li').click(function(){
    var flag=false;
    if($(this).hasClass('veggies_selected')){
      $(this).removeClass('veggies_selected');
      finalPrice-=itemPrice[$(this).text()];
      flag=true;
    }
    if($('.veggiesType .veggies_selected').length <5 && !flag){
      if(!$(this).hasClass('veggies_selected')){
        $(this).addClass('veggies_selected');
        finalPrice+=itemPrice[$(this).text()];
      }else{
        $(this).removeClass('veggies_selected');
      }
    }else{
        $(this).removeClass('veggies_selected');
    }
    $('#amount').text('Rs '+finalPrice);
  });
  $('.sauceType li').click(function(){
    if(!$(this).hasClass('sauce_selected')){
      $(this).addClass('sauce_selected');
      finalPrice+=itemPrice[$(this).text()];
    }else{
      $(this).removeClass('sauce_selected');
      finalPrice-=itemPrice[$(this).text()];
    }
    $('#amount').text('Rs '+finalPrice);
  });
  $('.extrasType li').click(function(){
    if(!$(this).hasClass('extras_selected')){
      $(this).addClass('extras_selected');
      finalPrice+=itemPrice[$(this).text()];
    }else{
      $(this).removeClass('extras_selected');
      finalPrice-=itemPrice[$(this).text()];
    }
    $('#amount').text('Rs '+finalPrice);
  });
  $('.checkout').click(function(){
      if($('.sauceType .sauce_selected').length ===0 && itemPrice[$(this).parent().parent().attr('class')]==='pizza'){
        alert('Please select all mandatory fields');
        checkoutFlag=false;
      }else{
        var tempKey='';
        if(itemPrice[$(this).parent().parent().attr('class')] ===undefined){
          tempKey=itemPrice[$(this).parent().attr('class').split(' ')[0]];
        }else{
          tempKey=itemPrice[$(this).parent().parent().attr('class')];
        }
        price_separate[tempKey]=finalPrice;
        total_bill=price_separate.pizza+price_separate.extras+price_separate.sides_Dessert
        checkoutFlag=true;
        $('.cart').removeClass('display-none');
        alert('Added to Your Cart Successfully');

      }
  });
    $('.sidesType li').click(function(){
    if(!$(this).hasClass('sides_selected')){
      $(this).addClass('sides_selected');
      finalPrice+=itemPrice[$(this).text()];
    }else{
      $(this).removeClass('sides_selected');
      finalPrice-=itemPrice[$(this).text()];
    }
    $('#amount').text('Rs '+finalPrice);
  });

  function removeSelectedProperties(){
    $('.veg_selected').removeClass('veg_selected');
    $('.veggies_selected').removeClass('veggies_selected');
    $('.cheese_selected').removeClass('cheese_selected');
    $('.sauce_selected').removeClass('sauce_selected');
    $('.customizePizzaRight .pizz_acc').siblings().not('.pizza_base:first').css('display','none');
   }

  $('.cart').click(function(){
    $('.menu_page').addClass('display-none');
    $('.amount').text(finalPrice);
  });

  $('.place_order').click(function(){
    alert("Yeah....your order will be delivered in 30 minutes");
  });
});
