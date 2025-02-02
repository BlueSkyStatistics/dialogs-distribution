





class sampleGammaDistribution extends baseModal {
    static dialogId = 'sampleGammaDistribution'
    static t = baseModal.makeT(sampleGammaDistribution.dialogId)

    constructor() {
        var config = {
            id: sampleGammaDistribution.dialogId,
            label: sampleGammaDistribution.t('title'),
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rgamma({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, shape={{selected.shape | safe}}, scale={{selected.scale | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Gamma Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: sampleGammaDistribution.t('entrdsname'),
                    required: true,
                    placeholder: "GammaSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "GammaSamples"
                })
            },
            shape: {
                el: new input(config, {
                    no: 'shape',
                    label: sampleGammaDistribution.t('shape'),
                    required: true,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: sampleGammaDistribution.t('scale'),
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
                    label: sampleGammaDistribution.t('lblnoofsamples'),
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
                    label: sampleGammaDistribution.t('lblnoofobsv'),
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
                    label: sampleGammaDistribution.t('lblseed'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },                         
            labelAddToDs: { el: new labelVar(config, { label: sampleGammaDistribution.t('lblAddtoDS'), style: "mt-3",h: 5 }) },
            smplmeans: { el: new checkbox(config, { label: sampleGammaDistribution.t('chklbl1'), no: "smplmeans", state:"checked", extraction: "Boolean", newline: true }) },
            smplsums: { el: new checkbox(config, { label: sampleGammaDistribution.t('chklbl2'), no: "smplsums", extraction: "Boolean", newline: true}) },
            smplsd: { el: new checkbox(config, { label: sampleGammaDistribution.t('chklbl3'), no: "smplsd", extraction: "Boolean", newline: true}) },
        }
        const content = {
            items: [objects.datasetname.el.content, objects.shape.el.content, objects.scale.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: sampleGammaDistribution.t('navigation'),
                icon: "icon-gamma-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sampleGammaDistribution.t('help.title'),
            r_help: sampleGammaDistribution.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: sampleGammaDistribution.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new sampleGammaDistribution().render()
}
