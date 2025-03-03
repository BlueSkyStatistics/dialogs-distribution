/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class sampleChisquaredDistribution extends baseModal {
    static dialogId = 'sampleChisquaredDistribution'
    static t = baseModal.makeT(sampleChisquaredDistribution.dialogId)

    constructor() {
        var config = {
            id: sampleChisquaredDistribution.dialogId,
            label: sampleChisquaredDistribution.t('title'),
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rchisq({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, df={{selected.degoffree | safe}}), ncol={{selected.noofobsrv | safe}}))
            rownames({{selected.datasetname | safe}}) <- paste("sample", 1:{{selected.noofsamples | safe}}, sep='')
            colnames({{selected.datasetname | safe}}) <- paste("obs", 1:{{selected.noofobsrv | safe}}, sep='')
            {{selected.datasetname | safe}}<- within({{selected.datasetname | safe}}, 
            {  
            #Checking if there is a single row or column
            if ( !({{selected.noofobsrv | safe}} == 1 || {{selected.noofsamples | safe}} ==1 ) )
            {
            if({{selected.smplmeans | safe}}) mean <- rowMeans({{selected.datasetname | safe}}[,1:{{selected.noofobsrv | safe}}]) 
            if({{selected.smplsums | safe}}) sum <- rowSums({{selected.datasetname | safe}}[,1:{{selected.noofobsrv | safe}}])
            if({{selected.smplsd | safe}}) sd <- apply({{selected.datasetname | safe}}[,1:{{selected.noofobsrv | safe}}], 1, sd)
            }
            else
            {
            cat ("We don't calculate sample mean, sum or standard deviation when there is a single row or column")
            }
            })
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Chi-squared Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: sampleChisquaredDistribution.t('entrdsname'),
                    required: true,
                    placeholder: "ChiSquaredSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "ChiSquaredSamples"
                })
            },
            degoffree: {
                el: new input(config, {
                    no: 'degoffree',
                    label: sampleChisquaredDistribution.t('degoffree'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            noofsamples: {
                el: new inputSpinner(config, {
                    no: 'noofsamples',
                    label: sampleChisquaredDistribution.t('lblnoofsamples'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",
                    value: 100,
                    extraction: "NoPrefix|UseComma"
                })
            },            
            noofobsrv: {
                el: new inputSpinner(config, {
                    no: 'noofobsrv',
                    label: sampleChisquaredDistribution.t('lblnoofobsv'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            }, 
            seedval: {
                el: new inputSpinner(config, {
                    no: 'seedval',
                    label: sampleChisquaredDistribution.t('lblseed'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },                         
            labelAddToDs: { el: new labelVar(config, { label: sampleChisquaredDistribution.t('lblAddtoDS'), style: "mt-3",h: 5 }) },
            smplmeans: { el: new checkbox(config, { label: sampleChisquaredDistribution.t('chklbl1'), no: "smplmeans", state:"checked", extraction: "Boolean", newline: true }) },
            smplsums: { el: new checkbox(config, { label: sampleChisquaredDistribution.t('chklbl2'), no: "smplsums", extraction: "Boolean", newline: true}) },
            smplsd: { el: new checkbox(config, { label: sampleChisquaredDistribution.t('chklbl3'), no: "smplsd", extraction: "Boolean", newline: true}) },
        }
        const content = {
            items: [objects.datasetname.el.content, objects.degoffree.el.content,  
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: sampleChisquaredDistribution.t('navigation'),
                icon: "icon-chi_squared-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sampleChisquaredDistribution.t('help.title'),
            r_help: sampleChisquaredDistribution.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: sampleChisquaredDistribution.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new sampleChisquaredDistribution().render()
}
