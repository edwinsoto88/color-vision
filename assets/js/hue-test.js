var _0x3959ce=_0x38f0;function _0x38f0(_0xe13318,_0x37d527){var _0x36e0d6=_0x36e0();return _0x38f0=function(_0x38f031,_0x5b508e){_0x38f031=_0x38f031-0x12d;var _0x5eb248=_0x36e0d6[_0x38f031];return _0x5eb248;},_0x38f0(_0xe13318,_0x37d527);}(function(_0x1adad3,_0x21086e){var _0xe694e=_0x38f0,_0x491f90=_0x1adad3();while(!![]){try{var _0x5a8488=-parseInt(_0xe694e(0x13c))/0x1+parseInt(_0xe694e(0x15f))/0x2+-parseInt(_0xe694e(0x17f))/0x3+parseInt(_0xe694e(0x15d))/0x4*(-parseInt(_0xe694e(0x171))/0x5)+parseInt(_0xe694e(0x16d))/0x6*(-parseInt(_0xe694e(0x151))/0x7)+-parseInt(_0xe694e(0x135))/0x8*(parseInt(_0xe694e(0x158))/0x9)+parseInt(_0xe694e(0x161))/0xa;if(_0x5a8488===_0x21086e)break;else _0x491f90['push'](_0x491f90['shift']());}catch(_0x5d0f44){_0x491f90['push'](_0x491f90['shift']());}}}(_0x36e0,0x1f719),$('body')[_0x3959ce(0x156)](_0x3959ce(0x136)),$(function(){var _0x13c9a6=_0x3959ce;_0x5425e7(),dragula([document[_0x13c9a6(0x176)](_0x13c9a6(0x14b))]),dragula([document[_0x13c9a6(0x176)]('row-2')]),dragula([document[_0x13c9a6(0x176)](_0x13c9a6(0x16b))]),dragula([document[_0x13c9a6(0x176)](_0x13c9a6(0x181))]);var _0x30ec8a={'date':'','score':_0x13c9a6(0x173),'gender':_0x13c9a6(0x173),'age':'n/a'};_0x30ec8a[_0x13c9a6(0x148)]=new Date();function _0x1d290b(){var _0x2be93e=_0x13c9a6;hArray=$(_0x2be93e(0x154))[_0x2be93e(0x133)]();var _0x32db07=hArray['length'];hArrayPosition=[],hArrayScore=[],totalScore=0x0,dataSum=[];for(i=0x0;i<_0x32db07;i++){var _0x19c3d7=$(hArray[i])[_0x2be93e(0x13a)]();dataSum=_0x19c3d7[_0x2be93e(0x147)]-i,dataSum=Math['abs'](dataSum),hArrayPosition[_0x2be93e(0x152)]([_0x19c3d7[_0x2be93e(0x147)],dataSum]),hArrayScore['push'](dataSum),totalScore=hArrayScore['reduce'](function(_0x575d9a,_0x1c8986){return _0x575d9a+_0x1c8986;});}}
$(_0x13c9a6(0x157))[_0x13c9a6(0x12d)](function(){var _0x7f6e92=_0x13c9a6;$('.hue-test')[_0x7f6e92(0x14e)](),$(_0x7f6e92(0x155))[_0x7f6e92(0x14e)](),$('.pw-hue-test')[_0x7f6e92(0x12f)](_0x7f6e92(0x136)),_0x1d290b(),_0x224bef(),_0x30ec8a[_0x7f6e92(0x15a)]=totalScore,$('.hue-score')[_0x7f6e92(0x165)](totalScore);}),$(_0x13c9a6(0x149))[_0x13c9a6(0x12d)](function(){var _0x12f03b=_0x13c9a6;if($(_0x12f03b(0x14c))['length']===0x0||$(_0x12f03b(0x130))[_0x12f03b(0x16f)]()==='0'){var _0x1bd841=$(_0x12f03b(0x14d))[_0x12f03b(0x16f)]();if(_0x1bd841==''||_0x1bd841==undefined||_0x1bd841==null)_0x1bd841='Select\x20an\x20age\x20range\x20and\x20a\x20gender\x20to\x20score\x20your\x20test';if($('.error-message')[_0x12f03b(0x17e)]!=0x0)$('.error-message')[_0x12f03b(0x165)]('');$(_0x12f03b(0x13e))[_0x12f03b(0x169)]('<p\x20class=\x27error-message\x27style=\x27color:red\x27>'+_0x1bd841+'</p>');}else $(_0x12f03b(0x131))[_0x12f03b(0x142)](),$(_0x12f03b(0x164))[_0x12f03b(0x167)]('submit');}),$(_0x13c9a6(0x164))['submit'](function(_0x3c3ff1){var _0x1a1668=_0x13c9a6,_0x3767f8=$('input[name=Gender]:checked')[_0x1a1668(0x16f)](),_0x2e6273=parseInt($(_0x1a1668(0x15c))[_0x1a1668(0x16f)]());if($(this)[_0x1a1668(0x12e)]()&&_0x3767f8!=undefined&&_0x2e6273!=0x0){var _0x45df45={};_0x45df45['Score']=parseInt($(_0x1a1668(0x134))[_0x1a1668(0x165)]()),_0x45df45[_0x1a1668(0x138)]=_0x3767f8,_0x45df45[_0x1a1668(0x132)]=_0x2e6273,$[_0x1a1668(0x13b)]({'url':$(this)['data'](_0x1a1668(0x177)),'type':'POST','data':JSON[_0x1a1668(0x143)](_0x45df45),'dataType':'json','contentType':_0x1a1668(0x140),'success':function(_0x2a73c9){var _0x24da8d=_0x1a1668;if(_0x2a73c9[_0x24da8d(0x168)]===!![]){$(_0x24da8d(0x14a))[_0x24da8d(0x14e)](),$('.compare-form-container')[_0x24da8d(0x14e)]();var _0x53241c=$(_0x24da8d(0x15c))[_0x24da8d(0x165)](),_0x42cb1d=$(_0x24da8d(0x179))[_0x24da8d(0x16f)]();$(_0x24da8d(0x139))['text'](_0x42cb1d),$(_0x24da8d(0x16c))[_0x24da8d(0x165)](_0x53241c),_0x30ec8a['gender']=_0x42cb1d,_0x30ec8a[_0x24da8d(0x14f)]=_0x53241c,_0x2a73c9[_0x24da8d(0x15b)]!=null&&_0x2a73c9['MaximumScore']!=null?($(_0x24da8d(0x13d))[_0x24da8d(0x145)]('li')[_0x24da8d(0x133)](),$(_0x24da8d(0x13d))[_0x24da8d(0x165)](_0x2a73c9['MinimumScore']),$(_0x24da8d(0x146))['closest']('li')['show'](),$(_0x24da8d(0x146))[_0x24da8d(0x165)](_0x2a73c9[_0x24da8d(0x16e)])):($(_0x24da8d(0x13d))[_0x24da8d(0x145)]('li')[_0x24da8d(0x142)](),$(_0x24da8d(0x146))[_0x24da8d(0x145)]('li')[_0x24da8d(0x142)]());}}});}
return![];});function _0x224bef(){var _0xee9b4a=_0x13c9a6,_0x374fa5={'labels':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'],'datasets':[{'fillColor':_0xee9b4a(0x137),'strokeColor':_0xee9b4a(0x163),'highlightFill':_0xee9b4a(0x15e),'highlightStroke':_0xee9b4a(0x13f),'data':hArrayScore}]};window[_0xee9b4a(0x175)]=new Chart(document[_0xee9b4a(0x176)](_0xee9b4a(0x17d))[_0xee9b4a(0x144)]('2d'))[_0xee9b4a(0x150)](_0x374fa5,{'responsive':!![]});}
$('.toggle-colorblindness')['change'](function(){var _0x110f68=_0x13c9a6,_0x3153a4='';$(_0x110f68(0x17a))[_0x110f68(0x141)](function(){var _0xd55c81=_0x110f68;_0x3153a4+=$(this)[_0xd55c81(0x165)]()+'\x20',$('.hue-test\x20>\x20div')[_0xd55c81(0x12f)](),$(_0xd55c81(0x172))[_0xd55c81(0x156)](_0x3153a4);}),_0x5425e7();});function _0x5425e7(){var _0x2b0004=_0x13c9a6;theRows=[_0x2b0004(0x170),_0x2b0004(0x174),_0x2b0004(0x160),_0x2b0004(0x159)];for(i=0x0;i<theRows['length'];i++){var _0x393193=$(theRows[i]),_0x43d4a0=_0x393193[_0x2b0004(0x162)]();while(_0x43d4a0[_0x2b0004(0x17e)]){_0x393193[_0x2b0004(0x180)](_0x43d4a0[_0x2b0004(0x17c)](Math['floor'](Math[_0x2b0004(0x178)]()*_0x43d4a0[_0x2b0004(0x17e)]),0x1)[0x0]);};}}}),$(_0x3959ce(0x166))['on'](_0x3959ce(0x12d),function(){var _0x4a8a74=_0x3959ce;$(_0x4a8a74(0x166))[_0x4a8a74(0x153)](_0x4a8a74(0x16a)),$('.btn-loader')[_0x4a8a74(0x156)](_0x4a8a74(0x17b)),setTimeout(()=>{var _0x4246ff=_0x4a8a74;$(_0x4246ff(0x157))['click'](),$('.instruction')[_0x4246ff(0x142)]();},0x1388);}));function _0x36e0(){var _0x1af790=['trigger','IsSuccess','after','<i\x20class=\x22fa\x20fa-crosshairs\x20btn-loader\x22></i>\x20PLEASE\x20WAIT...','row-3','#age','8046MvbfKU','MaximumScore','val','#row-1','5DDBrRh','.hue-test\x20>\x20div','n/a','#row-2','myRadar','getElementById','url','random','input[name=Gender]:checked','.toggle-colorblindness\x20option:selected','fa-spin','splice','canvas','length','530907FhyCao','append','row-4','click','valid','removeClass','.toggle-age-range','.error-message','RangeID','show','.hue-score','1747376DqNfBu','pw-hue-test','rgba(220,220,220,0.5)','Gender','#gender','data','ajax','91186jPMDRo','#best','.compare-form-container','rgba(220,220,220,1)','application/json;\x20charset=utf-8','each','hide','stringify','getContext','closest','#worst','position','date','#compare','.compare-container','row-1','input:radio[name=\x22Gender\x22]:checked','#hueTestValidation','collapse','age','Radar','1288NsNYKe','push','html','.hue-box','.hue-test-results','addClass','#calculate','9NOYHMr','#row-4','score','MinimumScore','.toggle-age-range\x20option:selected','496988YfpVDA','rgba(220,220,220,0.75)','196406sAkuhJ','#row-3','8881580kfJSSn','children','rgba(220,220,220,0.8)','#testResults','text','#finish'];_0x36e0=function(){return _0x1af790;};return _0x36e0();}
$('#take_test').on('click',function(e){e.preventDefault();$('html, body').animate({scrollTop:$("#bannerad1").offset().top},2000);});