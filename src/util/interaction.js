export const getClickedLayerFeatures = (featureGroups, sourceKey) =>
	featureGroups.reduce((all, fg) => {
		Object.entries(fg).forEach(([sourceLayerString, data]) => {
			/**
			 *  Extracting the layerId
			 *
			 * boundlessgeo/sdk returns sourceLayerString as sourceName-layerId.We need
			 * to group the data by layerId only.
			 *
			 * For example : "roads_layer-source-roads_layer" should be
			 * split to [roads_layer, roads_layer]
			 *
			 * This works because the source name is created from the layerId at creation * with a special string -(sourceKey)- as separator
			 *
			 * So here we are doing the reverse
			 *
			 *  */

			const layerId = sourceLayerString.split(`-${sourceKey}-`)[0];

			// if the clicked features are >n0 , return the first one Else nothing returned
			if (data.length) {
				all.push({ layerId: layerId, feature: data[0] });
			}
		});

		return all;
	}, []);
