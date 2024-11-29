





class negativeBinomialDistributionPlot extends baseModal {
    static dialogId = 'negativeBinomialDistributionPlot'
    static t = baseModal.makeT(negativeBinomialDistributionPlot.dialogId)

    constructor() {
        var config = {
            id: negativeBinomialDistributionPlot.dialogId,
            label: negativeBinomialDistributionPlot.t('title'),
            modalType: "one",
            RCode: `
                local(
                    {
                    #Generating the sequence of length 1000, the lower and upper bounds of the sequence are computed using the quantile function of the  Negative Binomial distribution  (qnbinom)  with p=0.0005 and p=0.9995 respectively 
                        lowProbBound =0.0005
                        upperProbBound=0.9995
                        lowerbound =qnbinom(p=lowProbBound, size={{selected.size | safe}}, prob={{selected.prob | safe}})
                        upperbound =qnbinom(p=upperProbBound, size={{selected.size | safe}}, prob={{selected.prob | safe}})
                        .x <- round(seq(lowerbound, upperbound, length.out=1000) )
                    if({{selected.a | safe}})
                    {
                        RcmdrMisc::plotDistr(.x, stats::dnbinom(.x, size={{selected.size | safe}}, prob={{selected.prob | safe}}), xlab="Number of Failures Until Target Successes", 
                        ylab="Probability Mass", 
                        main="Negative Binomial Distribution:  Trials={{selected.size | safe}}, 
                        Probability of success={{selected.prob | safe}}",   discrete=TRUE)
                    }
                    else
                    {
                    RcmdrMisc::plotDistr(.x, stats::pnbinom(.x, size={{selected.size | safe}}, {{selected.prob | safe}}), xlab="Number of Failures Until Target Successes",
                        ylab="Cumulative Probability", 
                        main="Negative Binomial Distribution:  Trials={{selected.size | safe}}, 
                        Probability of success={{selected.prob | safe}}",   discrete=TRUE, cdf=TRUE)
                    }
                    
                    }
                    )                        
                `
        }
        var objects = {
            size: {
                el: new input(config, {
                    no: 'size',
                    label: negativeBinomialDistributionPlot.t('size'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: negativeBinomialDistributionPlot.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            
            plotProb: { el: new radioButton(config, { label: negativeBinomialDistributionPlot.t('plotProb'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotDistrib: { el: new radioButton(config, { label: negativeBinomialDistributionPlot.t('plotDistrib'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.size.el.content, objects.prob.el.content, objects.plotProb.el.content, objects.plotDistrib.el.content],
            nav: {
                name: negativeBinomialDistributionPlot.t('navigation'),
                icon: "icon-negtive-binary-code-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: negativeBinomialDistributionPlot.t('help.title'),
            r_help: "help(data,package='utils')",
            body: negativeBinomialDistributionPlot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new negativeBinomialDistributionPlot().render()
}
