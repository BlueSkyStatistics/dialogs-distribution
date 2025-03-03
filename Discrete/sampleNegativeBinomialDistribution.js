/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class sampleNegativeBinomialDistribution extends baseModal {
    static dialogId = 'sampleNegativeBinomialDistribution'
    static t = baseModal.makeT(sampleNegativeBinomialDistribution.dialogId)

    constructor() {
        var config = {
            id: sampleNegativeBinomialDistribution.dialogId,
            label: sampleNegativeBinomialDistribution.t('title'),
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rnbinom({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, size={{selected.size | safe}}, prob={{selected.prob | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Negative Binomial Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: sampleNegativeBinomialDistribution.t('entrdsname'),
                    required: true,
                    placeholder: "NegativeBinomialSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "NegativeBinomialSamples"
                })
            },
            size: {
                el: new input(config, {
                    no: 'size',
                    label: sampleNegativeBinomialDistribution.t('size'),
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
                    label: sampleNegativeBinomialDistribution.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            noofsamples: {
                el: new inputSpinner(config, {
                    no: 'noofsamples',
                    label: sampleNegativeBinomialDistribution.t('lblnoofsamples'),
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
                    label: sampleNegativeBinomialDistribution.t('lblnoofobsv'),
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
                    label: sampleNegativeBinomialDistribution.t('lblseed'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },                         
            labelAddToDs: { el: new labelVar(config, { label: sampleNegativeBinomialDistribution.t('lblAddtoDS'), style: "mt-3",h: 5 }) },
            smplmeans: { el: new checkbox(config, { label: sampleNegativeBinomialDistribution.t('chklbl1'), no: "smplmeans", state:"checked", extraction: "Boolean", newline: true }) },
            smplsums: { el: new checkbox(config, { label: sampleNegativeBinomialDistribution.t('chklbl2'), no: "smplsums", extraction: "Boolean", newline: true}) },
            smplsd: { el: new checkbox(config, { label: sampleNegativeBinomialDistribution.t('chklbl3'), no: "smplsd", extraction: "Boolean", newline: true}) },
        }
        const content = {
            items: [objects.datasetname.el.content, objects.size.el.content, objects.prob.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: sampleNegativeBinomialDistribution.t('navigation'),
                icon: "icon-negtive-binary-code-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sampleNegativeBinomialDistribution.t('help.title'),
            r_help: sampleNegativeBinomialDistribution.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: sampleNegativeBinomialDistribution.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new sampleNegativeBinomialDistribution().render()
}
