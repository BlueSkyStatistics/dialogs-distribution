/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class gumbelDistributionPlot extends baseModal {
    static dialogId = 'gumbelDistributionPlot'
    static t = baseModal.makeT(gumbelDistributionPlot.dialogId)

    constructor() {
        var config = {
            id: gumbelDistributionPlot.dialogId,
            label: gumbelDistributionPlot.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000,the lower and upper bounds of the sequence are computed using the quantile function of the Gumbel distribution  (qgumbel)  with p=0.0005 and p=0.9995 respectively 
                lowProbBound =0.0005
                upperProbBound=0.9995
                lowerbound = RcmdrMisc::qgumbel(p=lowProbBound,location={{selected.location | safe}},scale={{selected.scale | safe}})
                upperbound = RcmdrMisc::qgumbel(p=upperProbBound,location={{selected.location | safe}},scale={{selected.scale | safe}})
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
                  RcmdrMisc::plotDistr(.x, RcmdrMisc::dgumbel(.x,location={{selected.location | safe}},scale={{selected.scale | safe}}),cdf=FALSE,xlab="x",ylab="Density",main=paste("Gumbel Distribution:  Location={{selected.location | safe}},Scale (inverse rate)={{selected.scale | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }
                else
                {
                  RcmdrMisc::plotDistr(.x, RcmdrMisc::pgumbel(.x,location={{selected.location | safe}},scale={{selected.scale | safe}}),cdf=TRUE,xlab="x",ylab="Cumulative Probability",main=paste("Gumbel Distribution:  Location={{selected.location | safe}},Scale (inverse rate)={{selected.scale | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }

                }
                )
                `
        }
        var objects = {
            location: {
                el: new input(config, {
                    no: 'location',
                    label: gumbelDistributionPlot.t('location'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: gumbelDistributionPlot.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            plotdenfun: { el: new radioButton(config, { label: gumbelDistributionPlot.t('pdenfun'), no: "a", increment: "TRUE", style:"mt-3", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotdistfun: { el: new radioButton(config, { label: gumbelDistributionPlot.t('pdstfun'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegUndr: { el: new labelVar(config, { label: gumbelDistributionPlot.t('lblregions'), style: "mt-3",h: 5 }) },
            xvalrad: { el: new radioButton(config, { label: gumbelDistributionPlot.t('xvals'), no: "b", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            quntlrad: { el: new radioButton(config, { label: gumbelDistributionPlot.t('quantiles'), no: "b", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegiFill: { el: new labelVar(config, { label: gumbelDistributionPlot.t('lblRegFill'), style: "mt-3",h: 5}) },

            lblRegion1: { el: new labelVar(config, { label: gumbelDistributionPlot.t('lblreg1'), style: "mt-3",h: 6 }) },
            reg1Frm: {
                el: new input(config, {
                    no: 'reg1frm',
                    label: gumbelDistributionPlot.t('lblregfrm'),
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
                    label: gumbelDistributionPlot.t('lblregto'),
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
                    label: gumbelDistributionPlot.t('lblregcol'),
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },            

            lblRegion2: { el: new labelVar(config, { label: gumbelDistributionPlot.t('lblreg2'), style: "mt-3",h: 6 }) },
            reg2Frm: {
                el: new input(config, {
                    no: 'reg2frm',
                    label: gumbelDistributionPlot.t('lblregfrm'),
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
                    label: gumbelDistributionPlot.t('lblregto'),
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
                    label: gumbelDistributionPlot.t('lblregcol'),
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },                           

            lblLegposi: { el: new labelVar(config, { label: gumbelDistributionPlot.t('lblLegPos'), style: "mt-3",h: 5 }) },
            toprtrad: { el: new radioButton(config, { label: gumbelDistributionPlot.t('toprt'), no: "c", increment: "TRUE", value: "topright", state: "checked", extraction: "ValueAsIs" }) },
            topltrad: { el: new radioButton(config, { label: gumbelDistributionPlot.t('toplt'), no: "c", increment: "FALSE", value: "topleft", state: "", extraction: "ValueAsIs" }) },
            topmidrad: { el: new radioButton(config, { label: gumbelDistributionPlot.t('topmid'), no: "c", increment: "FALSE", value: "top", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.location.el.content, objects.scale.el.content, 
                objects.plotdenfun.el.content, objects.plotdistfun.el.content, objects.lblRegUndr.el.content,
                objects.xvalrad.el.content, objects.quntlrad.el.content, 
                objects.lblRegiFill.el.content, 
                objects.lblRegion1.el.content, objects.reg1Frm.el.content, objects.reg1To.el.content, objects.reg1Col.el.content, 
                objects.lblRegion2.el.content, objects.reg2Frm.el.content, objects.reg2To.el.content, objects.reg2Col.el.content,
                objects.lblLegposi.el.content, objects.toprtrad.el.content, objects.topltrad.el.content,objects.topmidrad.el.content
            ],
            nav: {
                name: gumbelDistributionPlot.t('navigation'),
                icon: "icon-gumbel-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: gumbelDistributionPlot.t('help.title'),
            r_help: gumbelDistributionPlot.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: gumbelDistributionPlot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new gumbelDistributionPlot().render()
}
