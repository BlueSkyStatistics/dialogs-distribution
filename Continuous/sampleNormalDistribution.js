



class sampleNormalDistribution extends baseModal {
    static dialogId = 'sampleNormalDistribution'
    static t = baseModal.makeT(sampleNormalDistribution.dialogId)

    constructor() {
        var config = {
            id: sampleNormalDistribution.dialogId,
            label: sampleNormalDistribution.t('title'),
            modalType: "one",
            RCode: `
			{{if(options.selected.gpbox1 === 'selectFixedRandomSeed')}}
				base::set.seed({{selected.seedval | safe}})
			{{#else}}
				base::set.seed(BSkyGetRandomSeed())
			{{/if}}

            {{selected.datasetname | safe}} <- as.data.frame(matrix( stats::rnorm({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, mean={{selected.mean | safe}}, sd={{selected.sd | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Normal Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: sampleNormalDistribution.t('entrdsname'),
                    required: true,
                    placeholder: "NormalSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "NormalSamples"
                })
            },
            mean: {
                el: new input(config, {
                    no: 'mean',
                    label: sampleNormalDistribution.t('mean'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sd: {
                el: new input(config, {
                    no: 'sd',
                    label: sampleNormalDistribution.t('sd'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            noofsamples: {
                el: new inputSpinner(config, {
                    no: 'noofsamples',
                    label: sampleNormalDistribution.t('lblnoofsamples'),
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
                    label: sampleNormalDistribution.t('lblnoofobsv'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            }, 
			lbl1: { el: new labelVar(config, { label: sampleNormalDistribution.t('lbl1'), style: "mt-2", h:6 }) },
			selectRandomSeedRad: {
                el: new radioButton(config, {
                    label: sampleNormalDistribution.t('selectRandomSeedRad'),
                    no: "gpbox1",
                    increment: "selectRandomSeedRad",
                    value: "selectRandomSeed",
                    state: "checked",
					style: "ml-3",
                    extraction: "ValueAsIs",
                })
            },
			selectFixedRandomSeedRad: {
                el: new radioButton(config, {
                    label: sampleNormalDistribution.t('selectFixedRandomSeedRad'),
                    no: "gpbox1",
                    increment: "selectFixedRandomSeedRad",
                    value: "selectFixedRandomSeed",
                    //state: "checked",
					style: "ml-3",
                    extraction: "ValueAsIs",
                })
            },
			seedval: {
                el: new inputSpinner(config, {
                    no: 'seedval',
                    label: sampleNormalDistribution.t('lblseed'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "ml-5",                    
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },  
            labelAddToDs: { el: new labelVar(config, { label: sampleNormalDistribution.t('lblAddtoDS'), style: "mt-3",h: 5 }) },
            smplmeans: { el: new checkbox(config, { label: sampleNormalDistribution.t('chklbl1'), no: "smplmeans", state:"checked", extraction: "Boolean", newline: true }) },
            smplsums: { el: new checkbox(config, { label: sampleNormalDistribution.t('chklbl2'), no: "smplsums", extraction: "Boolean", newline: true}) },
            smplsd: { el: new checkbox(config, { label: sampleNormalDistribution.t('chklbl3'), no: "smplsd", extraction: "Boolean", newline: true}) },
        }
        const content = {
            items: [objects.datasetname.el.content, objects.mean.el.content, objects.sd.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, 
				objects.lbl1.el.content,
				objects.selectRandomSeedRad.el.content,
				objects.selectFixedRandomSeedRad.el.content,
				objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: sampleNormalDistribution.t('navigation'),
                icon: "icon-gaussian-function-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sampleNormalDistribution.t('help.title'),
            r_help: sampleNormalDistribution.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: sampleNormalDistribution.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new sampleNormalDistribution().render()
}
