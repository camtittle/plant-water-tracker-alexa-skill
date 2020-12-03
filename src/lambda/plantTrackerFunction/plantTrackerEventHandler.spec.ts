import { handler } from "./entry";
describe('plantTrackerEventHandler', () => {

  it('handles request', async () => {

    const mockRequest = {
      version: '1.0',
      session: {
        'new': true,
        sessionId: 'amzn1.echo-api.session.023e6800-d22a-4f0f-88c7-e873969b3dd1',
        application: {
          applicationId: 'amzn1.ask.skill.d210660a-ad47-4ef4-bbe4-549043c85407'
        },
        user: {
          userId: 'amzn1.ask.account.AGJU7JSTMGA4MGGHMJLRKH7VQW5M5TMQB4URSSSBRVXRVKIH3EXWF23BKMPJZFVSSKGSJ3HLSDJ2VEKOQBS44ULWAVBORJY4EE6K35MWPSCNMQM5TBOWWJ2JIMXEMBLU5ED476RJJUDB7DRVSIIDAOZ2FQANL4AQZI4BIQR6Z7DFPJJ3QPKXH7UZWJR3ZBMLK2QXWNZX3TPY77Q'
        }
      },
      context: {
        Viewports: [
          {
            type: 'APL',
            id: 'main',
            shape: 'RECTANGLE',
            dpi: 160,
            presentationType: 'STANDARD',
            canRotate: false,
            configuration: {
              current: {
                video: {
                  codecs: [
                    'H_264_42',
                    'H_264_41'
                  ]
                },
                size: {
                  type: 'DISCRETE',
                  pixelWidth: 1024,
                  pixelHeight: 600
                }
              }
            }
          }
        ],
        Viewport: {
          experiences: [
            {
              arcMinuteWidth: 246,
              arcMinuteHeight: 144,
              canRotate: false,
              canResize: false
            }
          ],
          shape: 'RECTANGLE',
          pixelWidth: 1024,
          pixelHeight: 600,
          dpi: 160,
          currentPixelWidth: 1024,
          currentPixelHeight: 600,
          touch: [
            'SINGLE'
          ],
          video: {
            codecs: [
              'H_264_42',
              'H_264_41'
            ]
          }
        },
        Extensions: {
          available: {
            'aplext:backstack:10': {}
          }
        },
        System: {
          application: {
            applicationId: 'amzn1.ask.skill.d210660a-ad47-4ef4-bbe4-549043c85407'
          },
          user: {
            userId: 'amzn1.ask.account.AGJU7JSTMGA4MGGHMJLRKH7VQW5M5TMQB4URSSSBRVXRVKIH3EXWF23BKMPJZFVSSKGSJ3HLSDJ2VEKOQBS44ULWAVBORJY4EE6K35MWPSCNMQM5TBOWWJ2JIMXEMBLU5ED476RJJUDB7DRVSIIDAOZ2FQANL4AQZI4BIQR6Z7DFPJJ3QPKXH7UZWJR3ZBMLK2QXWNZX3TPY77Q'
          },
          device: {
            deviceId: 'amzn1.ask.device.AEGCTG4X4DZZ2UTPK6HX6LZAVSA6TKVHP3LIRTBL7L2VMO436E7OWMNLECZCWRIIVQUO4HXTM3Q35XHELDE7ZZJEEOYOHGEAMXMNNZO3RLU5SAYNZ2KLPWDBPAIIYZHVKVHIOSPNUS72ID6F5FMZ6RJI5S6ABWYLC6W62UT36R6D7LNPS62RA',
            supportedInterfaces: {}
          },
          apiEndpoint: 'https://api.eu.amazonalexa.com',
          apiAccessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmQyMTA2NjBhLWFkNDctNGVmNC1iYmU0LTU0OTA0M2M4NTQwNyIsImV4cCI6MTYwNjg0MDY0NywiaWF0IjoxNjA2ODQwMzQ3LCJuYmYiOjE2MDY4NDAzNDcsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQVFBTi9oaVRhWmpSUmdRTDh3R2VRRFBtS1FFQUFBQUFBQUFmREJHa21RdEMrVkhMYUFpVWloSnd6ODFBNHhqWU9IVHJiK2xGaGMyQnRWSVJwYUFzdUE2V0tjMGN4NE4weGtWQTAwN2I1UzJkdXpSY3VJeE5KdzViSFIwd2VZZkdJdk5ML3VXRXlLMFRhUVRkRmRTUERYU0dMYXNXMkNwOVRHR2lzeit6cERPZ3g3ZXFEd214a09XUVozbDVHM0Y1SXhYOVg5TVI5c2VQUlAxTGNIcVdJRU1oWEh0VHpCaFhvRUhXZmowZ1h2OFZ0Q1hCT1JPUjlKRWY2RUI5N3dYdUlzTUwwWlBHRURLaCtJbHBQTGsyK2w3YlB5d1pLTmF1UDhxeHFiUU5vTkZxcU1WTWdYQlhQS3ZlODJGbnJIOGp6NjRDMllLcGhWdS9HZWFlRUVjUEZGVzVYbCtFYlMzcmNPeWpiR2FOM0J6NHhPYjlncWNVdkdFaXl4c0RWMDlrT1lxY3V6VHZoNUtwcVFSNEpxclJkY3pvenVZeTZGMVQ1LzduSUV1OTBHV1hyUDg9IiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUVHQ1RHNFg0RFpaMlVUUEs2SFg2TFpBVlNBNlRLVkhQM0xJUlRCTDdMMlZNTzQzNkU3T1dNTkxFQ1pDV1JJSVZRVU80SFhUTTNRMzVYSEVMREU3WlpKRUVPWU9IR0VBTVhNTk5aTzNSTFU1U0FZTloyS0xQV0RCUEFJSVlaSFZLVkhJT1NQTlVTNzJJRDZGNUZNWjZSSkk1UzZBQldZTEM2VzYyVVQzNlI2RDdMTlBTNjJSQSIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHSlU3SlNUTUdBNE1HR0hNSkxSS0g3VlFXNU01VE1RQjRVUlNTU0JSVlhSVktJSDNFWFdGMjNCS01QSlpGVlNTS0dTSjNITFNESjJWRUtPUUJTNDRVTFdBVkJPUkpZNEVFNkszNU1XUFNDTk1RTTVUQk9XV0oySklNWEVNQkxVNUVENDc2UkpKVURCN0RSVlNJSURBT1oyRlFBTkw0QVFaSTRCSVFSNlo3REZQSkozUVBLWEg3VVpXSlIzWkJNTEsyUVhXTlpYM1RQWTc3USJ9fQ.YGrgxoEFrevvXjOUQmUMUQBv3hHm3JT29Z2ijkAl_a6siqay3ppcn7Pk4FiI8FOwg0jMTWN57FsKDqRyi8MgC56ZkTZPoPmfW2UyBuphjnSL1sLONiVAA7flOgiO-TQ7AbCGlnK9U0OE7Ij75eQa887L7-femXwctDhREU1jnq5PXeRrzK0RFW5ZStZPs8HNt9rD9mjumTSkeFdLlZiAPgzkLgQLlDwCpNA3nBpUrVGgMIXEA4Ddlw2XRvKa_cPChWH3Qx0vFPwBoGjo0n0FQ8rzBfrpGFmWFvcx0IAOtUP6CGRo521NvIt_QSnuNECVpWLlff4KPQtWiqpBaUpfTA'
        }
      },
      request: {
        type: 'IntentRequest',
        requestId: 'amzn1.echo-api.request.cf61b66f-cd05-4412-8f07-76ea07ee6c98',
        locale: 'en-GB',
        timestamp: '2020-12-01T16:32:27Z',
        intent: {
          name: 'PlantWateredIntent',
          confirmationStatus: 'NONE',
          slots: {
            plantName: {
              name: 'plantName',
              value: 'the cheese plant',
              resolutions: {
                resolutionsPerAuthority: [
                  {
                    authority: 'amzn1.er-authority.echo-sdk.amzn1.ask.skill.d210660a-ad47-4ef4-bbe4-549043c85407.PlantName',
                    status: {
                      code: 'ER_SUCCESS_MATCH'
                    },
                    values: [
                      {
                        value: {
                          name: 'the cheese plant',
                          id: '3e171f9e8e5d85f9b7580d309c4cefd7'
                        }
                      }
                    ]
                  }
                ]
              },
              confirmationStatus: 'NONE',
              source: 'USER'
            }
          }
        },
        dialogState: 'COMPLETED'
      }
    };

    const result = await handler(mockRequest, {});


  });

});