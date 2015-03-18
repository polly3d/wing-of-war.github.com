
var index = 0
var amounts = 0
var lastValue = 0

function loadQuestion(index) {
	// console.log('index' + index);
	var questionOBj = questions[index]
	var text = questionOBj["question"]
	// console.log(text);
	lastValue = questionOBj["score"]
	$(".Question").text(text)

	var progressbar = document.getElementById('progress');
	// console.log(index / questions.length);
	progressbar.value = index / questions.length
}



var main = function() {
    $('.btn-primary').click(function(){
        $('#Stage1').hide();
        loadQuestion(0)
        $('#Stage2').show();
    });
    $('.button').click(function(){
    	if ($(this).hasClass('tick') == true) {
    		// console.log('Click YES');
    		amounts += lastValue
    		console.log(amounts);
    	} else {
			// console.log('Click NO');
    	}

    	index++
    	if (index < questions.length)
    	{
			loadQuestion(index)
    	} else 
    	{
    		$('#Stage2').hide()
    		$('#Stage3').show()
    		$('#Sum').text(amounts)
    	}
    })
}
$(document).ready(main)



var questions = [
	{
		question:"公司的创业项目有不错的前景",
		score:5
	},	{
		question:"员工自己认可公司的发展前景和项目",
		score:5
	},	{
		question:"觉得与自己未来的发展一致",
		score:5
	},

	{
		question:"公司拿到融资风投等，或者自身是盈利的",
		score:5
	},	{
		question:"行业工资平均",
		score:10
	},	{
		question:"比行业工资平均水平高出1.5倍",
		score:5
	},	

//Leader
	{
		question:"有2~5个左右的Co-Founder，或者是一个 `人格魅力和有做事魄力`的Boss",
		score:10
	},{
		question:"Boss要有做`企业家`的梦想和觉悟(特别是曾经在大公司做过高管的，`要有做企业的觉悟`，而不是带团队)",
		score:10
	},{
		question:"Boss做技术出生，乐于使用新技术和框架",
		score:5
	},{
		question:"Boss在一些知名企业有过较长且骨干的工作经验，受到业内人事的认可",
		score:5
	},	{
		question:"Boss的学历要在博士以下，本科以上，海外学历不限（太低的不用说，博士的容易陷入做得好技术，而不好产品或者市场的问题）",
		score:5
	},	{
		question:"有过2~3次创业经验的最佳（太多或者没有不算，多则运气不好，少则则缺乏经验）",
		score:5
	},	

//Manage
	{
		question:"上级能经常与自己的员工进行交流，保证成员的`政治正确`与`精神健康`",
		score:10
	},	{
		question:"项目管理有`计划性`，这周做什么，下周做什么，这个月做什么，项目的截止是什么",
		score:10
	},	{
		question:"每半年之内能看到公司的成长",
		score:10
	},	{
		question:"有可执行的`激励机制`，而不是想当然或者不执行",
		score:10
	},	{
		question:"如果不是技术研讨会，或者大的工作结点总结，时间应该控制得尽量短",
		score:5
	},	{
		question:"如果不是技术研讨会，或者大的工作结点总结，时间应该控制得尽量短",
		score:5
	},	{
		question:"加班要有正当的加班理由，并且应该找出加班原因，以及要有避免方法",
		score:5
	},  {
		question:"与`其它一些创业公司`有良性互动，学习的",
		score:5
	},

//Teammate（成员）
	{
		question:"有项目和开发经验丰富的同事，最好是些`业内专家`（另一个角度证明我们做的事是有专家认可的）",
		score:10
	},	{
		question:"大部分团队成员都是技术兵",
		score:8
	},	{
		question:"同事当中有`Geek`",
		score:7
	},	{
		question:"团队成员之间经常有交流，且交流的话题不限不工作和技术",
		score:5
	},	{
		question:"同事当中有对生活质量有品味，有追求，有愿景",
		score:5
	},	{
		question:"同事年龄相近",
		score:3
	},	{
		question:"年轻人为主",
		score:2
	},  {
		question:"主流大学毕业的人为主",
		score:5
	},	{
		question:"性别大于2:8",
		score:4
	},	{
		question:"没有Couple",
		score:1
	},	

//Job
	{
		question:"不做机械重复的事情",
		score:10
	},	{
		question:"提供开发工具（也许应该直说是Mac）",
		score:10
	},	{
		question:"可以放弃进度进行和`代码重构`，及项目的`Codereview`，保证工程质量 ",
		score:10
	},	{
		question:"鼓励使用Google，Stackoverflow，Github和开源社区",
		score:7
	},	{
		question:"使用Git 不使用SVN",
		score:3
	},	{
		question:"及时使用新的框架，弃用老旧框架",
		score:5
	},	{
		question:"自己在工作中的作品可以在经过允许的情况下开源",
		score:5
	},	

//Facility
	{
		question:"办公场地安静明亮",
		score:7
	},	{
		question:"有单独的休息室",
		score:3
	},	{
		question:"在正规的写字楼或者技术园，而不是某个民宅里（你又不是Founder）",
		score:5
	},	{
		question:"稳定的网速与带宽",
		score:8
	},	{
		question:"公司最好提供VPN上外网",
		score:2
	},	{
		question:"上班没有人盯和查岗（有计划按计划来就好）",
		score:5
	},	{
		question:"除非有重要安排，有弹性工作时间和在家的远程办公",
		score:5
	},	{
		question:"一周上五天班，周六上班应该有周六的工资",
		score:5
	},	{
		question:"提供多显示器",
		score:5
	},	{
		question:"外设，键盘，非廉价的办公椅（程序员就粘在椅子上的，体现人文关怀）",
		score:5
	},	{
		question:"提供测试设备",
		score:5
	},	{
		question:"基本零食",
		score:1
	},	{
		question:"提供午餐，或者报销",
		score:3
	},	{
		question:"晚餐",
		score:1
	},   {
		question:"报销学习书籍",
		score:2
	},	{
		question:"一些必要合理的`正版开发软件`",
		score:1
	},	{
		question:"提供的开发工具最终奖励给员工个人（有公司可以把给员工免息贷款买车，如果工作几年后业绩后就直接免还贷的，还有类似离职开火锅店的，绝对不过分）",
		score:2
	},	{
		question:"有定期和不定期的团建活动（吃饭，户外，电影票）",
		score:5
	},

//Project
	{
		question:"`源于创新，或情怀，或理想，而不是山寨，抄袭`",
		score:10
	},	{
		question:"项目本身能够`盈利`",
		score:10
	},	{
		question:"创新要基于当前实力",
		score:5
	},	{
		question:"目标用户群体是百万级别，或者当前已经有数十万稳定用户（广受众总是好的）",
		score:5
	},	{
		question:"UI设计强（用户看不见你的垃圾代码，但能明眼看见你的垃圾UI和交互）",
		score:10
	}
]