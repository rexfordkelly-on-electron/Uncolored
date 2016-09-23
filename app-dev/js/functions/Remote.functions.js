N.Functions.Remote = {};


N.Functions.Remote.funcGetUpdateInfo = (Parameters) => {
  reqwest({
    // url: `${N.strAppPath}/../CHANGELOG.md`,
    url: 'https://raw.githubusercontent.com/n457/Uncolored/master/CHANGELOG.md',
    success: (strResponse) => {
      let boolUpdateAvailable = false;

      // Remotly, strResponse.response doesn't work, use strResponse instead
      let strRemoteContent = N.Functions.Utils.funcMarkdownToHTML({ strContent: strResponse });

      if (strRemoteContent) {
        const strRemoteLastestVersion = strRemoteContent.match('- currentversion: (.*) -')[1];
        const arrRemoteLastestVersionNumbers = strRemoteLastestVersion.split('.');

        for (let intI = 0; intI < arrRemoteLastestVersionNumbers.length; intI++) {
          if (parseInt(arrRemoteLastestVersionNumbers[intI]) > parseInt(N.arrAppVersionNumbers[intI])) {
            boolUpdateAvailable = true;
          }
        }

        Parameters.funcOnSuccess.call(null, {
          boolUpdateAvailable: boolUpdateAvailable,
          strRemoteLastestVersion: strRemoteLastestVersion,
          strRemoteReleaseNotesHTML: strRemoteContent
        });
      }
    },
    error: (Error) => {
      console.error(Error);
      Parameters.funcOnError.call(null, Error);
    }
  });
};


N.Functions.Remote.funcGetPriorityInfo = (Parameters) => {
  reqwest({
    // url: `${N.strAppPath}/../project/docs/priority-info.md`,
    url: 'https://raw.githubusercontent.com/n457/Uncolored/master/project/docs/priority-info.md',
    success: (strResponse) => {
      // Remotly, strResponse.response doesn't work, use strResponse instead
      let strRemoteContent = N.Functions.Utils.funcMarkdownToHTML({ strContent: strResponse });

      if (strRemoteContent) {
        Parameters.funcOnSuccess.call(null, {
          strRemotePriorityInfoHTML: strRemoteContent
        });
      }
    },
    error: (Error) => {
      console.error(Error);
      Parameters.funcOnError.call(null, Error);
    }
  });
};
