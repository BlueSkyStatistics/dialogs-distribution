





class lognormalDistributionPlot extends baseModal {
    static dialogId = 'lognormalDistributionPlot'
    static t = baseModal.makeT(lognormalDistributionPlot.dialogId)

    constructor() {
        var config = {
            id: lognormalDistributionPlot.dialogId,
            label: lognormalDistributionPlot.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000,the lower and upper bounds of the sequence are computed using the quantile function of the Lognormal distribution  (qlnorm)  with p=0.0005 and p=0.9995 respectively 
                lowProbBound =0.0005
                upperProbBound=0.9995
                lowerbound = stats::qlnorm(p=lowProbBound,meanlog={{selected.meanlog | safe}},sdlog={{selected.sdlog | safe}})
                upperbound = stats::qlnorm(p=upperProbBound,meanlog={{selected.meanlog | safe}},sdlog={{selected.sdlog | safe}})
                .x <- seq(lowerbound,upperbound,length.out=1000)  
                
                #Optionally capturing regions to fill
                regionslist=NULL
                if(!is.na(as.numeric('{{selected.reg1frm | safe}}')) && !is.na(as.numeric('{{selected.reg1to | safe}}')) && !is.na(as.numeric('{{selected.reg2frm | safe}}')) && !is.na(as.numeric('{{selected.reg2to | safe}}')) )
                {
                    regionslist = list(c({{selected.reg1frm | safe}}, {{selected.reg1to | safe}}),c({{selected.reg2frm | safe}}, {{selected.reg2to | safe}}) )
                }
                else if(!is.na(as.numeric('{{selected.reg1frm | safe}}')) && !is.na(as.numeric('{{selected.reg1to | safe}}')))
                {
                        regionslist = list(c({{selected.reg1frm | safe}},{{selected.reg1to | safe}}))
                }
                
                #Plot a density function
                if({{selected.a | safe}})
                {
                  RcmdrMisc::plotDistr(.x, stats::dlnorm(.x,meanlog={{selected.meanlog | safe}},sdlog={{selected.sdlog | safe}}),cdf=FALSE,xlab="x",ylab="Density",main=paste("Lognormal Distribution:  Mean (log scale)={{selected.meanlog | safe}},Standard deviation (log scale)={{selected.sdlog | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }
                else
                {
                  RcmdrMisc::plotDistr(.x, stats::plnorm(.x,meanlog={{selected.meanlog | safe}},sdlog={{selected.sdlog | safe}}),cdf=TRUE,xlab="x",ylab="Cumulative Probability",main=paste("Lognormal Distribution:  Mean (log scale)={{selected.meanlog | safe}},Standard deviation (log scale)={{selected.sdlog | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }

                }
                )
                `
        }
        var objects = {
            meanlog: {
                el: new input(config, {
                    no: 'meanlog',
                    label: lognormalDistributionPlot.t('meanlog'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sdlog: {
                el: new input(config, {
                    no: 'sdlog',
                    label: lognormalDistributionPlot.t('sdlog'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            plotdenfun: { el: new radioButton(config, { label: lognormalDistributionPlot.t('pdenfun'), no: "a", increment: "TRUE", style:"mt-3", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotdistfun: { el: new radioButton(config, { label: lognormalDistributionPlot.t('pdstfun'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegUndr: { el: new labelVar(config, { label: lognormalDistributionPlot.t('lblregions'), style: "mt-3",h: 5 }) },
            xvalrad: { el: new radioButton(config, { label: lognormalDistributionPlot.t('xvals'), no: "b", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            quntlrad: { el: new radioButton(config, { label: lognormalDistributionPlot.t('quantiles'), no: "b", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegiFill: { el: new labelVar(config, { label: lognormalDistributionPlot.t('lblRegFill'), style: "mt-3",h: 5}) },

            lblRegion1: { el: new labelVar(config, { label: lognormalDistributionPlot.t('lblreg1'), style: "mt-3",h: 6 }) },
            reg1Frm: {
                el: new input(config, {
                    no: 'reg1frm',
                    label: lognormalDistributionPlot.t('lblregfrm'),
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            reg1To: {
                el: new input(config, {
                    no: 'reg1to',
                    label: lognormalDistributionPlot.t('lblregto'),
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            reg1Col: {
                el: new colorInput(config, {
                    no: 'reg1col',
                    label: lognormalDistributionPlot.t('lblregcol'),
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },            

            lblRegion2: { el: new labelVar(config, { label: lognormalDistributionPlot.t('lblreg2'), style: "mt-3",h: 6 }) },
            reg2Frm: {
                el: new input(config, {
                    no: 'reg2frm',
                    label: lognormalDistributionPlot.t('lblregfrm'),
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },    
            reg2To: {
                el: new input(config, {
                    no: 'reg2to',
                    label: lognormalDistributionPlot.t('lblregto'),
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },     
            reg2Col: {
                el: new colorInput(config, {
                    no: 'reg2col',
                    label: lognormalDistributionPlot.t('lblregcol'),
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },                           

            lblLegposi: { el: new labelVar(config, { label: lognormalDistributionPlot.t('lblLegPos'), style: "mt-3",h: 5 }) },
            toprtrad: { el: new radioButton(config, { label: lognormalDistributionPlot.t('toprt'), no: "c", increment: "TRUE", value: "topright", state: "checked", extraction: "ValueAsIs" }) },
            topltrad: { el: new radioButton(config, { label: lognormalDistributionPlot.t('toplt'), no: "c", increment: "FALSE", value: "topleft", state: "", extraction: "ValueAsIs" }) },
            topmidrad: { el: new radioButton(config, { label: lognormalDistributionPlot.t('topmid'), no: "c", increment: "FALSE", value: "top", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.meanlog.el.content, objects.sdlog.el.content, 
                objects.plotdenfun.el.content, objects.plotdistfun.el.content, objects.lblRegUndr.el.content,
                objects.xvalrad.el.content, objects.quntlrad.el.content, 
                objects.lblRegiFill.el.content, 
                objects.lblRegion1.el.content, objects.reg1Frm.el.content, objects.reg1To.el.content, objects.reg1Col.el.content, 
                objects.lblRegion2.el.content, objects.reg2Frm.el.content, objects.reg2To.el.content, objects.reg2Col.el.content,
                objects.lblLegposi.el.content, objects.toprtrad.el.content, objects.topltrad.el.content,objects.topmidrad.el.content
            ],
            nav: {
                name: lognormalDistributionPlot.t('navigation'),
                icon: "icon-log-normal-distribution-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: lognormalDistributionPlot.t('help.title'),
            r_help: lognormalDistributionPlot.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: lognormalDistributionPlot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new lognormalDistributionPlot().render()
}
